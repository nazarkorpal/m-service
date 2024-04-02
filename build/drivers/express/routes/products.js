"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function productRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post("", controller.addProduct);
    return router;
}
exports.default = productRoutes;
