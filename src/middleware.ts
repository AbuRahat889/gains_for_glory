import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check if user is authenticated (Modify this logic as per your auth system)
  const token = req.cookies.get("token")?.value; // Assuming authentication is stored in cookies

  // If the user is not authenticated and trying to access a protected route
  if (!token) {
    // Encode pathname for safety
    const destination = `/sign-in`; // Redirect to login with intended path

    return NextResponse.redirect(new URL(destination, req.url));
  }

  return NextResponse.next(); // Continue with the request
}

// Apply the middleware only to specific paths
export const config = {
  matcher: [
    // "/dashboard",
    // "/customer-info",
    // "/all-booking",
    // "/booking",
    // "/work-on",
  ], // Adjust this to match your protected routes
};
