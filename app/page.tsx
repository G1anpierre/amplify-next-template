import { revalidatePath } from "next/cache";
import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";
import Logout from "@/components/Logout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { addTodo, deleteTodo, toggleTodo } from "./actions/getData";
import FixTodosButton from "@/components/FixTodosButton";

async function App() {
  const user = await AuthGetCurrentUserServer();
  const { data: todos } = await cookiesClient.models.Todo.list();

  // Ensure all todos have isDone property, even if null/undefined from database
  const processedTodos = todos.map((todo) => ({
    ...todo,
    isDone:
      todo.isDone === null || todo.isDone === undefined ? false : todo.isDone,
  }));

  const completedTodos = processedTodos.filter((todo) => todo.isDone === true);
  const pendingTodos = processedTodos.filter((todo) => todo.isDone !== true);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8 px-4">
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between mb-4 items-center">
          <FixTodosButton />
          <ModeToggle />
        </div>
        <Card className="shadow-xl border-primary/5 overflow-hidden backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Task Master
                </CardTitle>
                <CardDescription className="text-sm">
                  Your personal task manager powered by AWS Amplify
                </CardDescription>
              </div>
              {user && (
                <div className="flex items-center gap-3 bg-secondary/40 rounded-full px-4 py-2">
                  <span className="text-sm text-muted-foreground">
                    {user.signInDetails?.loginId}
                  </span>
                  <Logout />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pb-8 space-y-8">
            <TodoForm addTodoAction={addTodo} />

            {processedTodos && processedTodos.length > 0 ? (
              <div className="space-y-8">
                {pendingTodos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground pl-1">
                      Pending Tasks ({pendingTodos.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingTodos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          id={todo.id}
                          content={todo.content || ""}
                          isDone={todo.isDone}
                          toggleTodoAction={toggleTodo}
                          deleteTodoAction={deleteTodo}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {completedTodos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground pl-1">
                      Completed Tasks ({completedTodos.length})
                    </h3>
                    <div className="space-y-3 opacity-80">
                      {completedTodos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          id={todo.id}
                          content={todo.content || ""}
                          isDone={todo.isDone}
                          toggleTodoAction={toggleTodo}
                          deleteTodoAction={deleteTodo}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-secondary/40 flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  You don&apos;t have any tasks yet. Add your first task above.
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center border-t py-4 text-xs text-muted-foreground bg-secondary/10">
            Powered by AWS Amplify & Next.js
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default App;
