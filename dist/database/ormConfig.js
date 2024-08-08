"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity/entity");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'cocwa-temp',
    entities: [entity_1.Thesi],
    synchronize: true,
});
exports.default = dataSource;
