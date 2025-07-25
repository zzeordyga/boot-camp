// Optional - only works with specific Next.js setups
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
