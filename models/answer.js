const mongoose = require('mongoose')


const answerschema = new mongoose.Schema({
    service: {
        type: String,
        
    },
    name: {
        type: String,
       
    },
    email: {
        type: String,
    
    },
    type: {
        type: String,
        
    },
    design: {
        type: String,
    
    },
    rentabilite: {
        type: String,
       
    },
    

    login: {
        type: String,
     
    },

    secteur: {
        type: String,
     
    },
    nbrpage: {
        type: Number,
  
    },
    infosupp1: {
        type: String,
      
    },
    infosupp2: {
        type: String,
      
    },
    typedev: {
        type: String,
     
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

   


})








module.exports = mongoose.model('answer', answerschema)