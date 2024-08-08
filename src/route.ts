import { homePage } from "./controllers/homePage";
import { addThesi,  } from "./controllers/thesiController";
import express  from "express";

const router = express.Router();

router.get("/", homePage);
router.post("/api/addThesi", addThesi);

export default router;
