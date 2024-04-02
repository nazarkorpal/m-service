"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: Number(process.env.PORT || 8080),
    postgres: {
        port: Number(process.env.DB_PORT || 0),
        database: process.env.DB_NAME || "",
        host: process.env.DB_HOST || "",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
    },
};
exports.default = config;
