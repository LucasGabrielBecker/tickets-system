var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: false,
        default: ''
    }

}, { timestamps: true });

const Ticket = mongoose.model('Ticket', TicketSchema);


module.exports = Ticket;