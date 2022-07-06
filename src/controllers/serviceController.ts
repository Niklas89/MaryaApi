import serviceModel from "../models/serviceModel";
import categoryModel from "../models/categoryModel";
import typeModel from "../models/typeModel";
import Category from "../types/categoryType";
import Service from "../types/serviceType";
import Type from "../types/typeType";
import Express from "express";

// les function pour les catégories:
//Récupérer toutes les catégories
const getCategories = (req: Express.Request, res: Express.Response) => {
    categoryModel.findAll()
        .then((categories: Category) => {
            res.status(200).json(categories);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id
const getCategoryById = (req: Express.Request, res: Express.Response) => {
    categoryModel.findByPk(req.params.id)
        .then((category: Category) => {
            res.status(200).json(category);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregistrer une nouvelle catégorie
const addCategory = (req: Express.Request, res: Express.Response) => {
    categoryModel.create({ name: req.body.name })
        .then((category: Category) => {
            res.status(201).json({ category: category.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier une catégorie via sont id
const editCategoryById = async (req: Express.Request, res: Express.Response) => {
    categoryModel.update({
        name: req.body.name
    }, {
        where: {
            idCategory: req.params.id
        }
    })
        .then((category: Category) => {
            res.status(201).json({ category: category.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Supprimer une catégorie via sont id
const deleteCategoryById = (req: Express.Request, res: Express.Response) => {
    categoryModel.destroy({
        where: {
            idCategory: req.params.id
        }
    })
        .then((category: Category) => {
            res.status(200).json({ category: category.id });
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

//Récupérer le service par l'id
const getServiceById = (req: Express.Request, res: Express.Response) => {
    serviceModel.findByPk(req.params.id)
        .then((service: Service) => {
            res.status(200).json(service);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitré un nouveau service
const addService = (req: Express.Request, res: Express.Response) => {
    serviceModel.create({ name: req.body.name })
        .then((service: Service) => {
            res.status(201).json({ service: service.id });
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
        .then((service: Service) => {
            res.status(201).json({ service: service.id });
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
        .then((service: Service) => {
            res.status(200).json({ service: service.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

// les function pour les types de service
// Récupérer les types de service
const getTypes = (req: Express.Request, res: Express.Response) => {
    typeModel.findAll()
        .then((types: Type) => {
            res.status(200).json(types);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Récupérer par l'id
const getTypeById = (req: Express.Request, res: Express.Response) => {
    typeModel.findByPk(req.params.id)
        .then((type: Type) => {
            res.status(200).json(type);
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Enregsitrer un nouveau type
const addType = (req: Express.Request, res: Express.Response) => {
    typeModel.create({ name: req.body.name })
        .then((type: Type) => {
            res.status(201).json({ type: type.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Modifier un Type via sont id
const editTypeById = (req: Express.Request, res: Express.Response) => {
    typeModel.update({
        name: req.body.name,
        updatedAt: req.body.updatedAt
    }, {
        where: {
            idType: req.params.id
        }
    })
        .then((type: Type) => {
            res.status(201).json({ type: type.id });
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

//Supprimer un Type via sont id
const deleteTypeById = (req: Express.Request, res: Express.Response) => {
    typeModel.destroy({
        where: {
            idType: req.params.id
        }
    })
        .then((type: Type) => {
            res.status(200).json({ type: type.id })
        })
        .catch((err: Error) => {
            res.status(409).send(err);
        });
};

export { getCategories, getCategoryById, addCategory, editCategoryById, deleteCategoryById, 
    getServices, getServiceById, addService, editServiceById, deleteServiceById, 
    getTypes, getTypeById, addType, editTypeById, deleteTypeById }