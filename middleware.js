export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/", "/about", "/blog","/contact", "/update/:path*"],
};