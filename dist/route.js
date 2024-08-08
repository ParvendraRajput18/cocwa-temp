"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homePage_1 = require("./controllers/homePage");
const thesiController_1 = require("./controllers/thesiController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/api/addThesi", thesiController_1.addThesi);
router.get("/api/getAllthesi", thesiController_1.getAllThesis);
router.get("/", homePage_1.homePage);
exports.default = router;
