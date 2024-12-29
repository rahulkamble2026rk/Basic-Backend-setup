const express=require("express"); 
const app=express(); 
const mongoose=require("mongoose");
const Chat=require('./models/chat.js');
const path = require("path");  
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views")); 
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.listen(8000,()=>
{
    console.log("server is running on 8000")
}) 
app.get("/",(req,res)=>
{
    res.send("Root is working");
}) 

const URL=`mongodb+srv://user:Rohit07@backend.jbrjl.mongodb.net/?retryWrites=true&w=majority&appName=Backend`

main().catch(err=>console.log(err));
async function main()
{
    await mongoose.connect(URL);
    console.log("Database connected successfully");
}


// let chat1=new Chat({
//          from:"Rahul", 
//          to:"Harahad", 
//          msg:"Send me the 15Rs",
//          created_at:new Date()
// })
// chat1.save().then((res)=>
// {
//     console.log(res);
// })

//Index Route 
app.get("/chats",async(req,res)=>
{
    let chats=await Chat.find();   //this is used to fethcing the all data from teh db
    // console.log("data coming from the db is:->")
    // console.log("data coming from the db is:->"+chats); 
    res.render("index.ejs",{chats}); //this is passing the data to the ejs fiel
}) 

//New Route
app.get("/chats/new",(req,res)=>
{
    res.render("new.ejs");
})  

//Create Route 
app.post("/chats",(req,res)=>
{
    let{from,to,msg}=req.body; //for directly ecthed the data we use th parser in the top of the file 
    let newChat=new Chat({
          from:from, 
          to:to, 
          msg:msg, 
          created_at:new Date()
    }) 

    newChat.save().then((res)=>   //here newChat.save() directly save or stored our data inth db 
    {
        console.log("chats was saved");
    })
    .catch((err)=>
    {
        console.log(err);
    })
    res.redirect("/chats");
}) 

//edit rroute: 
app.get("/chats/:id/edit",async(req,res)=>
{  
    let { id }=req.params; 
    id=id.trim();
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat}); 

}) 


//update Route : edit ejs madhun ekde request yeil 


app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;  //this is stroring the data whci is get passed via the route 
    id = id.trim(); 

    let { msg: newMsg } = req.body;
    console.log(newMsg);

   
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { new: true });  
    console.log(updatedChat);
    res.redirect("/chats");
});
 
//Destroy Route

app.delete("/chats/:id",async(req,res)=>
{
    let {id}=req.params; 
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat); 
    res.redirect("/chats"); 
})