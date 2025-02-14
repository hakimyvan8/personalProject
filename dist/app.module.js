"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const home_controller_1 = require("./home/home.controller");
const home_service_1 = require("./home/home.service");
const home_module_1 = require("./home/home.module");
const core_1 = require("@nestjs/core");
const user_interceptor_1 = require("./user/interceptors/user.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, prisma_module_1.PrismaModule, home_module_1.HomeModule],
        controllers: [app_controller_1.AppController, home_controller_1.HomeController],
        providers: [app_service_1.AppService, home_service_1.HomeService, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: user_interceptor_1.UserInterceptor
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map