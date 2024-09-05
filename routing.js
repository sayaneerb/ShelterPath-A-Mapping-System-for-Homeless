const express = require('express');
const route= express.Router();
const axios = require('axios');
// const services = require('../services/render');
var userDB= require('../model/model');

// home page route 
route.get('/',(req,res)=>{
       axios.get('http://localhost:4000/api/users').then(function(response){
                                                      //    console.log(response.data);
                                                      res.render('home',{users: response.data})   
                                                 }).catch(err=>{
                                                        res.status(500).send(err);
                                                 })
 
});
// add Homeless page
route.get('/addUser',(req,res)=>{
    res.render('addUser');
});

// help page 
route.get('/update',(req,res)=>{
       axios.get('http://localhost:4000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    
});
// location page 
route.get('/location',(req,res)=>{
       axios.get('http://localhost:4000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("maphome", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    
});
//      api control 
// crud operations
// ___________________________________________________________ 
// post api
route.post('/api/users',(req,res)=>{
               if(!req.body){
                      res.status(400).send({message:"please fill up the form"});
                      return;
               }

                      const user= new userDB({
                          name:req.body.name,
                          email:req.body.email,
                          status: req.body.status,
                          ngoName:req.body.ngoName,
                          details: req.body.details,
                          phone: req.body.phone,
                          lng:req.body.lng,
                          lat:req.body.lat
                          
                      })

                         user.save(user).then(data=>{
                            //     res.send(data)
                            res.redirect('/');
                         }).catch(err=>{
                                res.status(500).send({message:err.message || "some error occured"})
                         })
});
       //  update api 
       route.put('/api/users/:id', (req,res)=>{
            if(!req.body){
                      res.status(400).send({message:"field to be updated cannot be empty"});
            }else{
                      const id = req.params.id;
                        userDB.findByIdAndUpdate(id,req.body,{useFindAndModif:false}).then(data=>{
                               if(!data){
                                          res.status(500).send({message:"data not present"})
                               }else{
                                        res.send(data);
                               }
                        }).catch(err=>{
                               res.status(500).send({message:"error occcured"});
                        })
            }
       })
       //    delete api 
         route.delete('/api/users/:id', (req,res)=>{
                const id= req.params.id;
                  userDB.findByIdAndDelete(id).then(data=>{
                         if(!data){
                                res.status(400).send({message:"cannot delete with this id"})
                         }else{
                                res.send({message:"deleted successfully"})
                         }
                  }).catch(err=>{
                         res.status(500).send({message: "erroe occured"});
                  })
         });
       //    read api 
         route.get('/api/users',(req,res)=>{
                     const id= req.query.id
                       if(id){
                                userDB.findById(id).then(data=>{
                                       if(!data){
                                              res.status(404).send({message:"this id is not present"});
                                       }else{
                                                res.send(data);
                                       }
                                }).catch(err =>{
                                   res.status(500).send({ message: "Erro retrieving user with id "});
                               })
                       }else{
                                userDB.find().then(user=>{
                                       if(!user){
                                              res.status(404).send({message:"no user found"})
                                       }else{
                                                res.send(user)
                                       }
                                }).catch(err=>{
                                       res.status(500).send({message:"error occured"});
                                });
                       }
         })
module.exports=route;