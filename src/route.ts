import { homePage } from "./controllers/homePage";
import { addThesi, getAllThesis  ,getThesisByThesiId ,updateThesiStatus, deleteThesi} from "./controllers/thesiController";
import { getThesisByThepiId,deleteThepi } from "./controllers/thepiController";
import express  from "express";

const router = express.Router();


//thesi
router.post("/api/addThesi", addThesi);
router.get("/api/getAllThesi", getAllThesis)
router.get('/api/thesis/by-thesi/:thesiId', getThesisByThesiId);
router.put("/api/updateStatus/:thesiId", updateThesiStatus)
router.delete('/api/deleteThesi/by-thesi/:thesiId', deleteThesi);



//thepi
router.get('/api/thesis/by-thepi/:thepiId', getThesisByThepiId);
router.delete('/api/deleteThepi/by-thepi/:thepiId', deleteThepi);
router.get("/", homePage);


export default router;