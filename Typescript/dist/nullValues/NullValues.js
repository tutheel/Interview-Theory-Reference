"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = {
    token: null
};
const tokenUpper = session.token?.toUpperCase() ?? "NO TOKEN";
const refresh = session.refreshToken ?? "NO REFRESH TOKEN";
console.log("Token state:", tokenUpper);
console.log("Refresh token state:", refresh);
