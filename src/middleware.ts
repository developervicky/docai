import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth(async function middleware(req: any) {
  return withAuth(req);
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback"],
};
