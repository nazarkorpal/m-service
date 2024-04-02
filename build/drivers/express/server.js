"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../../config"));
const routes_1 = require("./routes");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const app = (0, express_1.default)();
function start(controllers) {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api/v1/", (0, routes_1.routes)(controllers));
    (0, express_list_endpoints_1.default)(app).map((e) => {
        console.log(`${e.methods} ${e.path}`);
    });
    app.listen(config_1.default.port, () => {
        console.log(`Server is running at port: ${config_1.default.port}`);
    });
}
exports.default = {
    start,
};
