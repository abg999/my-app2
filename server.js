const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


//BodyParser middleware
app.use(bodyParser.json());
app.get('/',function(req,res){
	res.send('hello');

})

const port = process.env.PORT || 5000;


app.listen(port,  ()=>console.log(`Server started on port ${port}`));