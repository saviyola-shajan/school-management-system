import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String,
        required:true,
        enum:["Academic","Extracricular","Emergency"]
    },
    attachments:{
        trype:String,
    }

},{
    timestamps:true
});

const Notification = mongoose.model("Notification",notificationSchema)
export default Notification
