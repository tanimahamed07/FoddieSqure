import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const roleBasedRoutes: Record<string, string[]> = {
  user: [
    "/book-table",
    "/dashboard",
    "/dashboard/my-favorites",
    "/dashboard/my-bookings",
    "/dashboard/profile",
  ],
  admin: [
    "/dashboard",
    "/dashboard/add-menu",
    "/dashboard/manage-menu",
    "/dashboard/manage-menu/edit/*",
    // "/dashboard/manage-menu/edit/:id",
    "/dashboard/reservations",
    "/dashboard/users",
    "/dashboard/profile",
  ],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.role as string;
  // console.log("=====> usrrole", userRole);

  if (!userRole || !roleBasedRoutes[userRole]) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoutes = roleBasedRoutes[userRole];

  // ৪. এক্সেস চেক করার লজিক (Wildcard বা exact match)
  const hasAccess = allowedRoutes.some((route) => {
    if (route.endsWith("/*")) {
      return pathname.startsWith(route.replace("/*", ""));
    }
    return pathname === route || pathname === `${route}/`;
  });

  if (!hasAccess) {
    // console.log(`❌ Role ${userRole} tried to access ${pathname} - Denied`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/book-table"],
};
