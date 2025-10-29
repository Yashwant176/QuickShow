import {clerkClient} from "@clerk/express"
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.auth(); // Clerk gives userId here
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings }); 
  } catch (error) {
    console.error("getUserBookings error:", error.message);
    res.json({ success: false, message: error.message });
  }
};


export const updateFavourite = async(req,res)=>{
    try {
        const {movieId}=req.body;
        const userId=req.auth().userId;
        const user=await clerkClient.users.getUser(userId)
        if(!user.privateMetadata.favourites){
            user.privateMetadata.favourites= []
        }
        if(!user.privateMetadata.favourites.includes(movieId)){
            user.privateMetadata.favourites.push(movieId)
        }else{
            user.privateMetadata.favourites= user.privateMetadata.favourites.filter(item => item !== movieId)
        }
        await clerkClient.users.updateUserMetadata(userId, {privateMetadata:user.privateMetadata})
        res.json({success:true, message:"Favoourite movies Updated"})
    } catch (error) {
        console.error(error.message)
        res.json({success:false, message:error.message})
    }
}


export const getFavourites = async(req,res)=>{
    try {
        const user =await clerkClient.users.getUser(req.auth().userId)
        const favourites=user.privateMetadata.favourites
        const movies =await Movie.find({_id: {$in: favourites}})
        res.json({success:true, movies})
    } catch (error) {
        console.error(error.message)
        res.json({success:false, message:error.message})
    }
}