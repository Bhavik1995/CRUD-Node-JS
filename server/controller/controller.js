const { response } = require('express');
var userdb = require('../model/model');

//create and save user

exports.create = (req,res)=>{
     //validate request

     if(!req.body){
         res.status(400).send({message: "Content cannot be empty"});
         return;
     }

     //new user
     const user = new userdb({
         name:req.body.name,
         email: req.body.email,
         gender: req.body.gender,
         status: req.body.status
     })

     //save user in database

     user.save(user)
     .then(data=>{
        //res.send(data);
        res.redirect('/')
     })
     .catch(err=>{
        res.status(500).send({
            message: err.message || "Some Error"
        });
     });
}

//retrieve and return all user

exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id
        userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message: "Not found user with id"+ id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: 'Error to retrieve the id'+id})
        })
    }
    else{
        userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error"});
        });
    }
}

//update new identified user by id

exports.update = (req,res)=>{

    if(!req.body){
        return res.status(400)
        .send({message: "Data to update cannot be empty"})
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found`})
        }else{
            res.send(data)  
        }
        
    })
    .catch(err=>{
        res.status(500).send({message: "Error update with user"})
    })
}

//delete user by id

exports.delete = (req,res)=>{
  const id  = req.params.id;

  userdb.findByIdAndDelete(id)
  .then(data=>{
      if(!data){
          res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong`})
      }
      else{
          res.send({
              message: 'User was sucessfully deleted'
          })
      }
  })
  .catch(err=>{
      res.status(500).send({
          message: 'Could not delete with user id='+ id
      });
  });
}