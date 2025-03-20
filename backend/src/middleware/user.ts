import { NextFunction, Request, Response } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  let Auth = req.headers.authorization;

  let token = Auth?.split(" ")[1];
  try {
    if (!token) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }
    next();
  } catch (error) {
    res.redirect("/login");
    res.status(401).json({ error: "User not authenticated" });
    return;
  }
}

export default isAuthenticated;
