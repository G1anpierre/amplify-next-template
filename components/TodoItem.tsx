"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  content: string;
  isDone: boolean;
  toggleTodoAction: (id: string, currentStatus: boolean) => Promise<void>;
  deleteTodoAction: (id: string) => Promise<void>;
}

export default function TodoItem({ 
  id, 
  content, 
  isDone, 
  toggleTodoAction, 
  deleteTodoAction 
}: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleTodoAction(id, isDone);
        toast.info(isDone ? "Task marked as incomplete" : "Task completed!");
      } catch (error) {
        toast.error("Failed to update todo");
        console.error(error);
      }
    });
  };

  const handleDelete = () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    startTransition(async () => {
      try {
        await deleteTodoAction(id);
        toast.error("Todo deleted");
      } catch (error) {
        toast.error("Failed to delete todo");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    });
  };

  return (
    <div 
      className={cn(
        "flex items-center p-4 rounded-lg border border-border/30 shadow-sm",
        "transition-all duration-300 ease-in-out hover:shadow-md group",
        "animate-in fade-in-50 slide-in-from-bottom-5",
        isDone 
          ? "bg-secondary/40 dark:bg-secondary/20" 
          : "bg-card hover:bg-accent/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center mr-3">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className={cn(
            "p-0 h-auto w-8 aspect-square rounded-full transition-all duration-300",
            "flex items-center justify-center",
            isDone 
              ? "bg-primary/10 text-primary hover:bg-primary/20" 
              : "hover:bg-primary/10"
          )}
          onClick={handleToggle}
          disabled={isPending}
        >
          {isDone ? (
            <CheckCircle 
              className={cn(
                "h-5 w-5 transition-all duration-500",
                isPending ? "opacity-60" : "opacity-100"
              )} 
            />
          ) : (
            <div className={cn(
              "w-5 h-5 rounded-full border-2 transition-all duration-300",
              isHovered ? "border-primary" : "border-muted-foreground/30"
            )} />
          )}
        </Button>
      </div>
      
      <div className="flex-1">
        <span className={cn(
          "text-sm transition-all duration-300",
          isDone ? "line-through text-muted-foreground" : "text-foreground"
        )}>
          {content}
        </span>
      </div>
      
      <Button 
        type="button" 
        variant="ghost" 
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full text-destructive opacity-0 group-hover:opacity-100",
          "transition-all duration-300 hover:bg-destructive/10"
        )}
        onClick={handleDelete}
        disabled={isDeleting || isPending}
      >
        {isDeleting ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
} 