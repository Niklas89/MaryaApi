import userModel from "../models/userModel";
import clientModel from "../models/clientModel";
import partnerModel from "../models/partnerModel";
import roleModel from "../models/roleModel";

const getUsers = (req: any, res: any, next: any) => {
    userModel.findAll()
    .then((users: any) => {
        res.status(200).json(users);
    })
      .catch((err: any) => {
        console.log(err);
      });
    };

    const getClients = (req: any, res: any, next: any) => {
      clientModel.findAll()
      .then((clients: any) => {
          res.status(200).json(clients);
      })
        .catch((err: any) => {
          console.log(err);
        });
      };

      const getPartners = (req: any, res: any, next: any) => {
        partnerModel.findAll()
        .then((partners: any) => {
            res.status(200).json(partners);
        })
          .catch((err: any) => {
            console.log(err);
          });
        };

        const getRoles = (req: any, res: any, next: any) => {
          roleModel.findAll()
          .then((roles: any) => {
              res.status(200).json(roles);
          })
            .catch((err: any) => {
              console.log(err);
            });
          };
  

/* 
exports.postAddUser = (req: { body: { firstName: any; imageUrl: any; price: any; description: any; }; }, res: any, next: any) => {
    const firstName = req.body.firstName;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    userModel.create({
        firstName: firstName,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
      .then((result: any) => {
        // console.log(result);
        console.log("Created User");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }; */


  export { getUsers, getClients, getPartners, getRoles };