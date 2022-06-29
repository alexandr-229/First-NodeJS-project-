"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.appContainer = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exeption_filter_1 = require("./errors/exeption.filter");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const users_contrller_1 = require("./users/users.contrller");
const users_service_1 = require("./users/users.service");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const users_repository_1 = require("./users/users.repository");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.IExeptionFilter).to(exeption_filter_1.ExeptionFilter);
    bind(types_1.TYPES.IUserCotroller).to(users_contrller_1.UserCotroller);
    bind(types_1.TYPES.IUserService).to(users_service_1.UserService);
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.UsersRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.appContainer = _a.appContainer, exports.app = _a.app;
//# sourceMappingURL=main.js.map