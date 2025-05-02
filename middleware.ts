import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplify-utils";

// This middleware checks if the user is authenticated
// If not, it redirects to the authentication UI
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    // Check if the user is authenticated
    const authenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(contextSpec, {});
          return session.tokens !== undefined;
        } catch (error) {
          return false;
        }
      },
    });

    if (authenticated) {
      // User is authenticated, allow access
      return response;
    }

    // User is not authenticated
    // The Authenticator in layout.tsx will handle showing the login UI
    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error, still allow access and let the Authenticator handle it
    return response;
  }
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (authentication page)
     * - signUp (registration page)
     */
    "/((?!^(?:_next/static|_next/image|favicon.ico|login|signUp)).*)",
  ],
};
