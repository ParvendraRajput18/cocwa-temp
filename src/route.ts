import { homePage } from "./controllers/homePage";
import { addThesi, getAllThesis  ,getThesisByThesiId ,updateThesiStatus} from "./controllers/thesiController";
import { getThesisByThepiId } from "./controllers/thepiController";
import express  from "express";

const router = express.Router();


//thesi
router.post("/api/addThesi", addThesi);
router.get("/api/getAllThesi", getAllThesis)
router.get('/api/thesis/by-thesi/:thesiId', getThesisByThesiId);
router.put("/api/updateStatus/:thesiId", updateThesiStatus)



//thepi
router.get('/api/thesis/by-thepi/:thepiId', getThesisByThepiId);
router.get("/", homePage);


export default router;