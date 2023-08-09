const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://Loichi:mdp123@cluster0.srdtv22.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req,res,next)=>{
    console.log("Requete recue !");
    next();
});

app.use((req, res , next)=>{
    res.status(201);
    next();
})

app.use((req, res, next)=>{
    
    res.json({message : "Votre requete a bien été recue"});
    next();

})

app.use((req, res ) =>{
    console.log("Réponse envoyée avec succès !");
})

module.exports = app;
