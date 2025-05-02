"use server";

import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function fixTodosWithMissingIsDone() {
  try {
    console.log("Starting to fix todos with missing isDone field");
    
    // Get all todos
    const { data: todos } = await cookiesClient.models.Todo.list();
    console.log(`Found ${todos.length} todos`);
    
    let updatedCount = 0;
    
    // Update each todo to include isDone field if missing
    for (const todo of todos) {
      console.log(`Processing todo ${todo.id}, isDone:`, todo.isDone);
      
      if (todo.isDone === null || todo.isDone === undefined) {
        console.log(`Updating todo ${todo.id} to set isDone to false`);
        
        try {
          await cookiesClient.models.Todo.update({
            id: todo.id,
            isDone: false
          });
          
          updatedCount++;
          console.log(`Successfully updated todo ${todo.id}`);
        } catch (updateError) {
          console.error(`Error updating todo ${todo.id}:`, updateError);
        }
      }
    }
    
    console.log(`Updated ${updatedCount} todos with missing isDone field`);
    
    // Refresh the page
    revalidatePath('/');
    
    return { success: true, updated: updatedCount };
  } catch (error) {
    console.error("Error fixing todos:", error);
    return { success: false, error: (error as Error).message };
  }
} 