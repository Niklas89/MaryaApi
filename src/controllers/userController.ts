import userModel from "../models/userModel";

const getUsers = (req: any, res: any, next: any) => {
    userModel.findAll()
    .then((users: any) => {
        res.status(200).json(users);
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


  export {getUsers};