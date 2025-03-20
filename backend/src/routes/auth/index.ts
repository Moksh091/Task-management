import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const userRouter = Router();

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user.id);
  }
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return done(null, false);
    }
    console.log(user);
    done(null, user);
  } catch (error) {
    done(error, null)
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/api/v1/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function verify(accessToken, refreshToken, profile: any, done) {
      try {
        let User = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });
        if (!User) {
          User = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            },
          });
        }
        return done(null, User);
      } catch (error) {
        return done(error);
      }
    }
  )
);

userRouter.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

userRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:5173/dashboard",
  })
);

userRouter.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return err;
    }
    res.redirect("/");
  });
});
