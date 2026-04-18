import { auth } from "@/auth";

export { auth as proxy } from "@/auth";

export default auth((req)=>{
    const isLoggedIn = !!req.auth;

    const  protectedRoutes = ["/orders", "/checkout"];

    const isProtected = protectedRoutes.some((route)=> req.nextUrl.pathname.startsWith(route));

    if (!isLoggedIn && isProtected) {
        const loginUrl = new URL("/login", req.nextUrl.origin);

        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

        return Response.redirect(loginUrl);
    }

    
});

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};