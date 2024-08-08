"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./route"));
const express = require("express");
const app = express();
app.use(express.json());
app.use(route_1.default);
app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
