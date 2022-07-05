import express from "express";
const router = express.Router();

//On importe toutes les functions depuis le controller
import { getCategories, getCategoryById, addCategory, editCategoryById, deleteCategoryById, 
    getServices, getServiceById, addService, editServiceById, deleteServiceById, 
    getTypes, getTypeById, addType, editTypeById, deleteTypeById } from "../controllers/serviceController";

//Toutes les routes pour les catégories
router.get("/category", getCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", addCategory);
router.put("/category/:id", editCategoryById);
router.delete("/category/:id", deleteCategoryById);

//Toutes les routes pour les types de service
router.get("/type", getTypes);
router.get("/type/:id", getTypeById);
router.post("/type", addType);
router.put("/type/:id", editTypeById);
router.delete("/type/:id", deleteTypeById);

//Toutes les routes pour les services
router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", addService);
router.put("/:id", editServiceById);
router.delete("/:id", deleteServiceById);

export default router;