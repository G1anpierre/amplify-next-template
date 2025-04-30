import { NextRequest, NextResponse } from 'next/server';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';

// Configure Amplify on the server
Amplify.configure(outputs, { ssr: true });

// Generate the client
const client = generateClient<Schema>();

// Handle authentication headers
function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  // Extract the token from the Authorization header
  // Format is usually "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}

// GET a single todo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get token from request headers
    const token = getAuthToken(request);
    
    if (!token) {
      console.log('Warning: No valid auth token provided');
      // You can choose to reject unauthenticated requests or allow them in dev mode
    }
    
    const { data: todo } = await client.models.Todo.get({
      id: params.id
    });
    
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    
    // More detailed error response
    if (error instanceof Error) {
      if (error.message.includes('NoValidAuthTokens')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please sign in.' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT to update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }
    
    const { data: updatedTodo } = await client.models.Todo.update({
      id: params.id,
      content: body.content
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    
    // More detailed error response
    if (error instanceof Error) {
      if (error.message.includes('NoValidAuthTokens')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please sign in.' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get token from request headers
    const token = getAuthToken(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    await client.models.Todo.delete({ id: params.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    
    // More detailed error response
    if (error instanceof Error) {
      if (error.message.includes('NoValidAuthTokens')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please sign in.' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
} 