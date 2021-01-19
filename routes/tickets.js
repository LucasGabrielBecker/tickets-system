const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Ticket = require('../models/Ticket');
const User = require('../models/User');

//@desc   First tickets
//@route  GET /tickets
router.get('/all', async(req, res) => {
   const tickets = await Ticket.find({}).lean();
   res.json(tickets).status(200)
});

//@desc   Edit ticket
//@route  PUT /tickets/edit/:id
//@PARAMS   ID
router.put('/edit/:id', async(req, res) => {
   const reqId = req.params.id;
   if(!mongoose.Types.ObjectId.isValid(reqId)) {
      res.json({succes:false, msg:"Provide valid ID"}).status(404)
   }

   Ticket.findOneAndUpdate(
      {_id: reqId},
      {$set:
         {title:req.body.title, description: req.body.description}},
         {new:true}) 
            .then((docs)=>{
               if(docs) {
                  res.json(docs).status(201)
               } else {
                  res.json({success:false,data:"no such user exist"});
               }
               }).catch((err)=>{
                  console.log(err)
                  res.json({succes:false, msg:"There are an error"}).status(500)
               })
})

//@desc   Create ticket
//@route  POST /createTicket
router.post('/create', async(req, res) => {
   const ticketdata = req.body;
   
   const ticket = Ticket(ticketdata)
   await ticket.save()

   res.json(ticket).status(200)


});


//@desc     Get ticket from it ID
//@route    GET /tickets/id
//@PARAMS   ID
router.get('/:id', async (req, res)=>{
   const id = req.params.id;
   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.json({succes:false, msg:"Provide valid ID"}).status(404)
   }

   const ticket = await Ticket.findById(id)
   if(!ticket){
      res.json({msg:"No ticket founded"}).status(404)
   }

   res.json(ticket).status(200)

})



module.exports = router;