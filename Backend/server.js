import express from "express";
import Connection from "./Connection.js";
import User from "./Schema/User.js";
import bodyParser from "body-parser";

let app = express();
app.use(bodyParser.json());

app.get("/", async(req, res) => {
    await User.find()
    .then(users => res.json(users))
});

app.post("/post", async (req, res) => {
    let body = req.body;

    //to get unique email from a user
    let data = await User.find({email: body.email});
    if(data.length > 0){
        return res.status(401).send({message: "user already exists"})
    }
    try {
        let result = await User.insertMany(body);
        res.status(201).send({ message: "data created", value: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

//the id specified is the id given in line line 32
app.patch("/update/:id", async(req, res) => {
    let body = req.body;
    let id = req.params.id;
    
    try{
        //the new: true will give the revised data that instance but if we dont use then we get the previously updated data.
        let value = await User.findByIdAndUpdate(id, body, {new: true});
        res.status(201).send({ message: "data updated", value});
    }catch(error){
        console.log(error)
    }
})

app.delete("/delete/:id", async (req, res) => {
    
    try{
        let id = req.params.id;
        let data = await User.findByIdAndDelete(id) 
        res.status(201).send({ message: "data deleted",data}); 
    }
    catch (err) {
        console.log(err)
    }
    
});

Connection().then(() => {
    app.listen(8080, () => {
        console.log("Your server is running");
    });
});
