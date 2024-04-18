import express from "express";
import { authenticate } from "../middlewares/authentication";
import {
  getBodyPartList,
  getEquipmentList,
  getTargetList,
  getExercisesByEquipment,
  getExercisesByTarget,
  getExerciseById,
  getExerciseByName,
  getAllExercises,
  getExercisesByBodyPart,
} from "../controllers/exerciseController";

const router = express.Router();

router.get("/bodypart/:bodypart", getExercisesByBodyPart);
router.get("/bodypartlist", getBodyPartList);
router.get("/equipmentlist", authenticate, getEquipmentList);
router.get("/targetlist", authenticate, getTargetList);
router.get("/equipment/:type", authenticate, getExercisesByEquipment);
router.get("/target/:target", authenticate, getExercisesByTarget);
router.get("/:id", authenticate, getExerciseById);
router.get("/name/:name", authenticate, getExerciseByName);
router.get("/", getAllExercises);

export default router;
