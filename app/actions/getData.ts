"use server";


import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

// Configure Amplify on the server
// Amplify.configure(outputs, { ssr: true });

// Generate the client
const client = generateClient<Schema>();

export async function getTodos() {
  try {
    const { data: todos } = await client.models.Todo.list();
    console.log("todos in getData", todos);
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function createTodo(content: string) {
  try {
    const { data: newTodo } = await client.models.Todo.create({
      content,
      isDone: false,
    });
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}



export async function addTodo(data: FormData) {

  const content = data.get("content") as string;
  if (!content.trim()) return;
  
  try {
    await cookiesClient.models.Todo.create({
      content,
      isDone: false,
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

export async function deleteTodo(id: string) {
  try {
    await cookiesClient.models.Todo.delete({ id });
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

export async function toggleTodo(id: string, currentStatus: boolean) {
  try {
    await cookiesClient.models.Todo.update({
      id,
      isDone: !currentStatus,
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}