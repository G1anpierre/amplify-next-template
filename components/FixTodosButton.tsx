"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fixTodosWithMissingIsDone } from "@/app/actions/fix-todos";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function FixTodosButton() {
  const [isFixing, setIsFixing] = useState(false);
  
  const handleFixTodos = async () => {
    if (isFixing) return;
    
    setIsFixing(true);
    try {
      const result = await fixTodosWithMissingIsDone();
      
      if (result.success) {
        const count = result.updated || 0;
        toast.success(`Fixed ${count} todos with missing isDone field`);
        if (count > 0) {
          window.location.reload();
        }
      } else {
        toast.error(`Failed to fix todos: ${result.error}`);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsFixing(false);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleFixTodos}
      disabled={isFixing}
    >
      {isFixing ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          Fixing...
        </>
      ) : (
        "Fix Todos"
      )}
    </Button>
  );
} 