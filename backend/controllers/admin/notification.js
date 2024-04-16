import asyncHandler from "express-async-handler";
import Notification from "../../modles/admin/notificationModel.js";

//add notification
export const addNotification = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, attachments, date } = req.body;
    if (!title || !content || !category || !date) {
      return res.status(400).json({ message: "Enter all fields" });
    }
    const notification = await Notification.findone({ title });
    if (notification) {
      return res.status(400).json({ message: "Notification already exist" });
    }
    const addNotification = await Notification.create({
      title,
      content,
      category,
      attachments,
      date,
    });
    await addNotification.save();
    res.status(200).json({addNotification,message:"Notification added sucessfully"})
  } catch (error) {
    throw new Error(error);
  }
});

//edit notification
export const editNotification=asyncHandler(async(req,res)=>{
    try{
const notificationId=req.params._id
const {title,content,category,attachments,date}=req.body
const existingnotification=await Notification.findOne({notificationId})
if(!existingnotification){
return res.status(400).json({message:"Notifiation not found"})
}
if(title!==undefined&&title!=="")existingnotification.title=title
if(content!==undefined&&content!=="")existingnotification.content=content
if(category!==undefined&&category!=="")existingnotification.category=category
if(attachments!==undefined&&attachments!=="")existingnotification.attachments=attachments
if(date!==undefined&&date!=="")existingnotification.date=date
await existingnotification.save()
res.status(200).json({existingnotification,message:"notification updated sucessfully"})
    }catch(error){
        throw new Error(error)
    }
})

//delete Notification
export const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const notificationId = req.params._id;
    const notification = await Notification.findOneAndDelete({
      notificationId,
    });
    if (notification) {
      res.status(200).json({ message: "notification deleted successfully" });
    } else {
      res.status(404).json({ message: "notification not found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//get all notifications
export const getAllNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res
      .status(200)
      .json({ notifications, message: "All notifications rendered" });
  } catch (error) {
    throw new Error(error);
  }
});
