"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormConfig_1 = __importDefault(require("../database/ormConfig"));
ormConfig_1.default.initialize()
    .then(() => {
    console.log('Connected to the PostgreSQL database.');
})
    .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
});
exports.default = ormConfig_1.default;
