import express from "express";
import Connection from "./Connection.js";
import User from "./Schema/User.js";
import bodyParser from "body-parser";

let app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Working...");
});

app.post("/post", async (req, res) => {
    let body = req.body;

    try {
        let result = await User.insertMany(body);
        res.status(201).send({ message: "data created", value: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

Connection().then(() => {
    app.listen(8080, () => {
        console.log("Your server is running");
    });
});
