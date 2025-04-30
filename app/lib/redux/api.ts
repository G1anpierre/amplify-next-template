import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchAuthSession } from 'aws-amplify/auth';

// Define the Todo type
interface Todo {
  id: string;
  content: string | null;
  owner: string | null;
  createdAt: string;
  updatedAt: string;
}

// Create the API slice with RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // This will be our API route for server actions
    prepareHeaders: async (headers) => {
      try {
        // Get the current session from Amplify Auth
        console.log('Fetching auth session...');
        const { tokens } = await fetchAuthSession();
        const token = tokens?.idToken?.toString();
        if (token) {
          console.log('Auth token available, adding to headers');
          headers.set('Authorization', `Bearer ${token}`);
        } else {
          console.warn('No auth token available in fetchAuthSession');
        }
      } catch (error) {
        console.error('Error setting auth header:', error);
      }
      return headers;
    },
    // Add response validation to handle auth errors
    responseHandler: async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.error('API error response:', response.status, data);
        if (response.status === 401) {
          throw { status: 401, data };
        }
        throw { status: response.status, data };
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      return data;
    },
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todos'],
      // Handle unauthorized errors
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 401) {
          return { message: 'Please sign in to view todos' };
        }
        return { message: 'Error loading todos' };
      },
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todos', id }],
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todos', id }],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api; 