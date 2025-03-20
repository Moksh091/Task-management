// import { Session } from "express-session";

declare namespace Express {
  interface User {
    id: string;
  }
}

// declare module "express-session" {
//   interface Session {
//     userId?: string; // Declare userId as optional
//   }
// }
