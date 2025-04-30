import { NextRequest, NextResponse } from 'next/server';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';

// Configure Amplify on the server
console.log('Configuring Amplify in API route');
try {
    Amplify.configure(outputs, { ssr: true });
    console.log('Amplify configured successfully');
  } catch (configError) {
    console.error('Amplify configuration error:', configError);
  }
  
  let client: any;
  try {
    client = generateClient<Schema>();
    console.log('Client generated successfully');
  } catch (clientError) {
    console.error('Client generation error:', clientError);
  }

// Handle authentication headers
function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  console.log('Auth header:', authHeader);
  
  if (!authHeader) return null;
  
  // Extract the token from the Authorization header
  // Format is usually "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}

// GET handler to fetch all todos
export async function GET(request: NextRequest) {
  console.log('GET /api/todos - Request received');

  if (!client) {
    return new Response(JSON.stringify({ error: 'Client not initialized' }), { status: 500 });
  }
  
  try {
    // Get token from request headers
    const token = getAuthToken(request);
    
    if (!token) {
      console.log('Warning: No valid auth token provided');
      // You can choose to reject unauthenticated requests or allow them in dev mode
      // For now, we'll proceed with the request
    } else {
      console.log('Token received with length:', token.length);
    }
    
    // The client will use the token from the session if available
    console.log('Calling client.models.Todo.list()');
    const { data: todos } = await client.models.Todo.list();
    console.log('Todos fetched:', todos.length);
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    
    // More detailed error response
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('NoValidAuthTokens')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please sign in.' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// POST handler to create a new todo
export async function POST(request: NextRequest) {
  console.log('POST /api/todos - Request received');
  
  try {
    // Get token from request headers
    const token = getAuthToken(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    console.log('Request body:', body);
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }
    
    console.log('Creating todo with content:', body.content);
    const { data: newTodo } = await client.models.Todo.create({
      content: body.content
    });
    console.log('New todo created:', newTodo);
    
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    
    // More detailed error response
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('NoValidAuthTokens')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please sign in.' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
} 