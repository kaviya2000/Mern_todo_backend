const mongoose = require('mongoose');  // connecting monogodb
const express = require('express');// connecting express
const cors = require('cors');//connecting crosss origin
const app = express();
const port = process.env.PORT || 5000;
//connecting with  mongodb compass
mongoose.connect('mongodb+srv://kaviyakavzz:kaviya@project.zhve6x1.mongodb.net/?retryWrites=true&w=majority&appName=Project')
    //connectivity string =adress+data
    .then(() => {
        console.log('Connected to vcet database');
    })
    .catch((err) => {
        console.error(err);
    });
    
    const UserSchema = new mongoose.Schema({
 
     names:{type: String}, fname:{type: String}, mname:{type:String}, age:{type:Number},email: { type: String}, password: {type: String}


});
 
const Collections = mongoose.model('happys', UserSchema);
 
app.use(express.json());
app.use(cors());
 
 
 
app.post('/kaviya', async (req, resp) => {
    try {  //postman-- req  - govandan
        const user = new Collections(req.body);
        const result = await user.save();
        const datasending = result.toObject();
        //text string
        // converting all datas to obj
        resp.send(datasending);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});


app.get("/anu",async(req,res)=>{
    try{
        const getUser=await Collections.find({}," names fname mname age email password");
        
        res.json(getUser);
    }
    catch(e)
    {
        console.log("If it is wrong getting error");
        
    }
})



 
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});