const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// for all the endpoints in this file
// the user must be logged in


//@desc   First tickets
//@route  GET /tickets
router.get('/all', async(req, res) => {
   const tickets = await Ticket.find({}).lean();
   res.json(tickets).status(200)
});

//@desc   View single ticket
//@route  GET /tickets/edit/:id
router.get('/edit/:id', async(req, res) => {
   const reqId = req.params.id;
   const ticket = await Ticket.findOne({ _id: reqId }).lean();
   console.log(ticket);
   res.render('editTicket', {
      layout: 'main',
      ticket: ticket
   })
});

//@desc   Create ticket page
//@route  Get /createTicket
router.get('/createTicket', async(req, res) => {
   const users = await User.find({}).lean();
   res.render('createTicket', {
      layout: 'main',
      users: users
   })
});

//@desc   Create ticket save method
//@route  POST /saveTicket
router.post('/saveTicket', async(req, res) => {
   const { title, description, createdBy } = req.body;
   var ticket = await Ticket.create({
      title: title,
      description: description,
      createdBy: createdBy
   })
   res.json({ msg: "Ticket created successfully!" })
});




module.exports = router;