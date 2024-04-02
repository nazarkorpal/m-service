"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrivalRoutes(app, controller) {
    app.use("/arrivals");
    app.post("", controller.addArrival);
    return app;
}
exports.default = arrivalRoutes;
