import { homePage } from "./controllers/homePage";
import { addThesi, getAllThesis  ,getThesisByThesiId} from "./controllers/thesiController";
import { getThesisByThepiId } from "./controllers/thepiController";
import express  from "express";

const router = express.Router();

router.get("/", homePage);
router.post("/api/addThesi", addThesi);
router.get("/api/getAllThesi", getAllThesis)
router.get('/api/thesis/by-thepi/:thepiId', getThesisByThepiId);
router.get('/api/thesis/by-thesi/:thesiId', getThesisByThesiId);
    
export default router;
