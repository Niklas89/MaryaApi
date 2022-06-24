import express from "express";
const router = express.Router();

//On importe toutes les functions depuis le controller
import { getServiceCategory, getCategoryById, addCategory, editCategoryById, deleteCategoryById, getServices, getServiceById, addService, editServiceById, deleteServiceById, getServicesType, getServiceTypeById, addServiceType, editServiceTypeById, deleteServiceTypeById } from "../controllers/serviceController";

//Toutes les routes pour les catégories
router.get("/category", getServiceCategory);
router.get("/category/:id", getCategoryById);
router.post("/category", addCategory);
router.put("/category/:id", editCategoryById);
router.delete("/category/:id", deleteCategoryById);

//Toutes les routes pour les services
router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", addService);
router.put("/:id", editServiceById);
router.delete("/:id", deleteServiceById);

//Toutes les routes pour les types de service
router.get("/type", getServicesType);
router.get("/type/:id", getServiceTypeById);
router.post("/type", addServiceType);
router.put("/type/:id", editServiceTypeById);
router.delete("/type/:id", deleteServiceTypeById);

export default router;