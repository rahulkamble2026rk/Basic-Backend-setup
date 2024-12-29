const mongoose = require("mongoose")
const Chat=require ('./models/chat.js')
const URL = `mongodb+srv://user:Rohit07@backend.jbrjl.mongodb.net/?retryWrites=true&w=majority&appName=Backend`

main().catch(err => console.log(err)); 

async function main() {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
}


let AllChats=[
    {
        from: "Rahul",
        to: "Harahad",
        msg: "Send me the 15Rs",
        created_at: new Date()
    },
    {
        from: "soham",
        to: "vinay",
        msg: "Hi",
        created_at: new Date()
    },
    {
        from: "Omkar",
        to: "Chote Guruji",
        msg: "Jai Ho Ballsingh",
        created_at: new Date()
    },
    {
        from: "DKMishra",
        to: "RHande",
        msg: "Bas Kar be",
        created_at: new Date()
    },
    {
        from: "Jagdish",
        to: "Kolhapuri",
        msg: "Oh Ya!!",
        created_at: new Date()
    },

]
 
Chat.insertMany(AllChats); 

