"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const process = require("node:process");
async function bootstrap() {
    dotenv.config();
    const port = +process.env.SERVER_PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.enableCors();
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map