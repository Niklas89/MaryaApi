import serviceModel from "../models/serviceModel";
import serviceCategoryModel from "../models/serviceCategoryModel";
import serviceTypeModel from "../models/serviceTypeModel";
import ServiceCategory from "../types/categoryType";
import Service from "../types/serviceType";
import ServiceType from "../types/serviceTypeType";
import Express from "express";

// les function pour les catégories:
//Récupérer toutes les catégories
const getServiceCategory = (req: Express.Request, res: Express.Response) => {
    serviceCategoryModel.findAll()
        .then((serviceCategorys: ServiceCategory) => {
            res.status(200).json(serviceCategorys);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id
const getCategoryById = (req: Express.Request, res: Express.Response) => {
    serviceCategoryModel.findByPk(req.params.id)
        .then((serviceCategory: ServiceCategory) => {
            res.status(200).json(serviceCategory);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitré une nouvelle catégorie
const addCategory = (req: Express.Request, res: Express.Response) => {
    serviceCategoryModel.create({ name: req.body.name })
        .then((serviceCategory: ServiceCategory) => {
            res.status(201).json({ category: serviceCategory.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier une catégorie via sont id
const editCategoryById = async (req: Express.Request, res: Express.Response) => {
    serviceCategoryModel.update({
        name: req.body.name
    }, {
        where: {
            idServiceCategory: req.params.id
        }
    })
        .then((serviceCategory: ServiceCategory) => {
            res.status(201).json({ category: serviceCategory.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Supprimer une catégorie via sont id
const deleteCategoryById = (req: Express.Request, res: Express.Response) => {
    serviceCategoryModel.destroy({
        where: {
            idServiceCategory: req.params.id
        }
    })
        .then((serviceCategory: ServiceCategory) => {
            res.status(200).json({ category: serviceCategory.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

// les function pour les services
// Récupérer tous les services
const getServices = (req: Express.Request, res: Express.Response) => {
    serviceModel.findAll()
        .then((services: Service) => {
            res.status(200).json(services);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id
const getServiceById = (req: Express.Request, res: Express.Response) => {
    serviceModel.findByPk(req.params.id)
        .then((services: Service) => {
            res.status(200).json(services);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitré un nouveau service
const addService = (req: Express.Request, res: Express.Response) => {
    serviceModel.create({ name: req.body.name })
        .then((services: Service) => {
            res.status(201).json({ category: services.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier un service via sont id
const editServiceById = (req: Express.Request, res: Express.Response) => {
    serviceModel.update({
        name: req.body.name,
        updatedAt: req.body.updatedAt
    }, {
        where: {
            idService: req.params.id
        }
    })
        .then((services: Service) => {
            res.status(201).json({ category: services.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Supprimer un service via sont id
const deleteServiceById = (req: Express.Request, res: Express.Response) => {
    serviceModel.destroy({
        where: {
            idService: req.params.id
        }
    })
        .then((services: Service) => {
            res.status(200).json({ category: services.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

// les function pour les types de service
// Récupérer les types de service
const getServicesType = (req: Express.Request, res: Express.Response) => {
    serviceTypeModel.findAll()
        .then((services: ServiceType) => {
            res.status(200).json(services);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id
const getServiceTypeById = (req: Express.Request, res: Express.Response) => {
    serviceTypeModel.findByPk(req.params.id)
        .then((ServiceType: ServiceType) => {
            res.status(200).json(ServiceType);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitré une nouvelle catégorie
const addServiceType = (req: Express.Request, res: Express.Response) => {
    serviceTypeModel.create({ name: req.body.name })
        .then((ServiceType: ServiceType) => {
            res.status(201).json({ category: ServiceType.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier une catégorie via sont id
const editServiceTypeById = (req: Express.Request, res: Express.Response) => {
    serviceTypeModel.update({
        name: req.body.name,
        updatedAt: req.body.updatedAt
    }, {
        where: {
            idServiceType: req.params.id
        }
    })
        .then((ServiceType: ServiceType) => {
            res.status(201).json({ category: ServiceType.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Supprimer une catégorie via sont id
const deleteServiceTypeById = (req: Express.Request, res: Express.Response) => {
    serviceTypeModel.destroy({
        where: {
            idServiceType: req.params.id
        }
    })
        .then((ServiceType: ServiceType) => {
            res.status(200).json({ category: ServiceType.id })
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

export { getServiceCategory, getCategoryById, addCategory, editCategoryById, deleteCategoryById, getServices, getServiceById, addService, editServiceById, deleteServiceById, getServicesType, getServiceTypeById, addServiceType, editServiceTypeById, deleteServiceTypeById }