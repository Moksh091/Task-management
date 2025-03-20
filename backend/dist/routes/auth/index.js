"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userRouter = (0, express_1.Router)();
passport_1.default.serializeUser((user, done) => {
    if (user) {
        done(null, user.id);
    }
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { id } });
        if (!user) {
            return done(null, false);
        }
        console.log(user);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "http://localhost:3000/api/v1/oauth2/redirect/google",
    scope: ["profile", "email"],
}, function verify(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let User = yield prisma.user.findUnique({
                where: {
                    googleId: profile.id,
                },
            });
            if (!User) {
                User = yield prisma.user.create({
                    data: {
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    },
                });
            }
            return done(null, User);
        }
        catch (error) {
            return done(error);
        }
    });
}));
exports.userRouter.get("/login/federated/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
exports.userRouter.get("/oauth2/redirect/google", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:5173/dashboard",
}));
exports.userRouter.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            return err;
        }
        res.redirect("/");
    });
});
