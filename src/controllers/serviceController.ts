import serviceModel from "../models/serviceModel";
import serviceCategoryModel from "../models/serviceCategoryModel";
import serviceTypeModel from "../models/serviceTypeModel";

const getService = (req:any, res:any) => {
    serviceModel.findAll
    .then((service:any) => {
        res.status(200).json(service)
    })
    .catch((err:any) => {
        console.log(err);
    });
};

const getServiceCategory = (req:any, res:any) => {
    serviceCategoryModel.findAll
    .then((serviceCategory:any) => {
        res.status(200).json(serviceCategory)
    })
    .catch((err:any) => {
        console.log(err);
    });
}; 

const getServiceType = (req:any, res:any) => {
    serviceTypeModel.findAll
    .then((serviceType:any) => {
        res.status(200).json(serviceType)
    })
    .catch((err:any) => {
        console.log(err);
    });
};

export { getService, getServiceCategory, getServiceType}