import mongoose from "mongoose";

let UserData = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamps: true
})

const User = mongoose.model("user", UserData);
export default User;