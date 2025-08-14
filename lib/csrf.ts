// import { randomBytes } from "crypto";
// import { serialize, parse } from "cookie";
// import { NextApiRequest, NextApiResponse } from "next";

// export function generateCsrfToken() {
//   return randomBytes(32).toString("hex");
// }

// export function setCsrfCookie(res: NextApiResponse) {
//   const token = generateCsrfToken();

//   res.setHeader(
//     "Set-Cookie",
//     serialize("csrf-token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 60 * 60 // 1 hour
//     } )
//   );

//   return token;
// }

// export function validateCsrfToken(req: NextApiRequest) {
//   const cookies = parse(req.headers.cookie || "");
//   const cookieToken = cookies["csrf-token"];
//   const bodyToken = req.body.csrfToken;

//   if (!cookieToken || !bodyToken || cookieToken !== bodyToken) {
//     return false;
//   }

//   return true;
// }
