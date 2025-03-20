"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuthenticated(req, res, next) {
    let Auth = req.headers.authorization;
    let token = Auth === null || Auth === void 0 ? void 0 : Auth.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }
        next();
    }
    catch (error) {
        res.redirect("/login");
        res.status(401).json({ error: "User not authenticated" });
        return;
    }
}
exports.default = isAuthenticated;
