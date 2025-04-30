"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoFormProps {
  addTodoAction: (formData: FormData) => Promise<void>;
}

export default function TodoForm({ addTodoAction }: TodoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const content = formData.get("content") as string;
    
    if (!content || !content.trim()) {
      toast.error("Todo content cannot be empty");
      return;
    }
    
    startTransition(async () => {
      try {
        await addTodoAction(formData);
        toast.success("Todo added successfully!");
        
        // Clear the form
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      } catch (error) {
        toast.error("Failed to add todo");
        console.error(error);
      }
    });
  };

  return (
    <form 
      action={handleSubmit} 
      className={cn(
        "flex gap-3 mb-8 transition-all duration-300 ease-in-out",
        "p-1 rounded-lg",
        isFocused ? "bg-accent/50 shadow-md" : "bg-transparent"
      )}
    >
      <Input
        type="text"
        name="content"
        placeholder="Add a new task..."
        className={cn(
          "flex-1 border-2 border-transparent focus-visible:border-primary/20 py-6 px-4",
          "transition-all duration-300 bg-background",
          "placeholder:text-muted-foreground/70"
        )}
        required
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button 
        type="submit" 
        disabled={isPending}
        className="px-5 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Task
          </>
        )}
      </Button>
    </form>
  );
} 