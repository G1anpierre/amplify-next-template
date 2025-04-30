# AWS Amplify Next.js (App Router) Starter Template

![AWS Amplify + Next.js](https://github.com/G1anpierre/amplify-next-template/raw/main/public/amplify-next.png)

A modern, full-stack starter template for building scalable web applications using Next.js (App Router) and AWS Amplify Gen 2.

## Overview

This template equips you with a foundational Next.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.
- **Server Actions**: Implementation of Next.js server actions with AWS Amplify for more efficient data fetching.
- **Redux Toolkit & RTK Query**: State management and API request handling with caching, refetching, and optimistic updates.

## Server Actions Implementation

This template demonstrates how to implement Next.js server actions with AWS Amplify to fetch and manipulate data. Server actions improve performance by:

- **Reducing Client-Side Data Fetching**: Moving data fetching logic to the server eliminates client-side network requests.
- **Improved Security**: Sensitive operations run on the server, keeping API keys and credentials secure.
- **Better Performance**: Reduces client-side JavaScript, improving loading times and SEO.

### How It Works

1. Server actions are defined in the `app/actions` directory.
2. The `getTodos`, `createTodo`, and `deleteTodo` functions are implemented as server actions.
3. These functions are imported into client components and called directly.

### Example Usage

```javascript
// In your client component
import { getTodos } from "./actions/getData";

// Use the server action
const todos = await getTodos();
```

## Redux Toolkit & RTK Query Implementation

The project includes a REST API implementation using Redux Toolkit and RTK Query, which offers several benefits:

- **Automatic Caching**: RTK Query automatically caches API responses to minimize network requests.
- **Automatic Refetching**: Automatically refetches when needed (e.g., after mutations).
- **Optimistic Updates**: Updates UI optimistically before server confirms changes.
- **Loading & Error States**: Built-in loading and error states for better UX.

### How It Works

1. API routes are defined in the `app/api` directory.
2. Redux store and API slice are configured in `app/lib/redux`.
3. API endpoints automatically convert between REST and GraphQL using Amplify.

### Example Usage

```javascript
// In your client component
import { 
  useGetTodosQuery,
  useCreateTodoMutation 
} from './lib/redux/api';

function MyComponent() {
  // Fetch data automatically
  const { data, isLoading, error } = useGetTodosQuery();
  
  // Mutation hook
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  
  // Create a new todo
  const handleCreate = async () => {
    await createTodo({ content: 'New Todo' });
    // No need to refetch - RTK Query handles it
  };
  
  // Render UI using data, isLoading, error
}
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/G1anpierre/amplify-next-template.git
   cd amplify-next-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Amplify:
   ```bash
   npx ampx sandbox
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app` - Next.js App Router components and pages
- `/amplify` - Amplify backend configuration and resources
- `/components` - Reusable UI components
- `/lib` - Utility functions and hooks
- `/public` - Static assets
- `/styles` - Global CSS and Tailwind configuration

## Database Schema

The application includes a sample Todo model with the following schema:

```typescript
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});
```

## Deploying to AWS

For deploying your application to AWS:

1. Configure the AWS account:
   ```bash
   ampx configure
   ```

2. Deploy the backend:
   ```bash
   ampx deploy
   ```

3. Deploy the frontend to Amplify Hosting:
   ```bash
   npx amplify add hosting
   npx amplify publish
   ```

For detailed instructions, refer to the [deployment documentation](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws).

## Contributing

Contributions are welcome! See [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for security issue reporting.

## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file for details.