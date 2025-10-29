import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });

    // ✅ Fetch all upcoming shows
    const shows = await Show.find({ showDateTime: { $gte: new Date() } });

    // ✅ Manually attach movie info (since movie is a string, not ObjectId)
    const activeShows = await Promise.all(
      shows.map(async (show) => {
        const movie = await Movie.findById(show.movie);
        return {
          ...show.toObject(),
          movie,
        };
      })
    );

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } });

    // ✅ Attach movie manually again
    const showsWithMovies = await Promise.all(
      shows.map(async (show) => {
        const movie = await Movie.findById(show.movie);
        return {
          ...show.toObject(),
          movie,
        };
      })
    );

    res.json({ success: true, shows: showsWithMovies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
      })
      .sort({ createdAt: -1 });

    // ✅ Add movie manually to each booking’s show
    const bookingsWithMovies = await Promise.all(
      bookings.map(async (booking) => {
        if (booking.show) {
          const movie = await Movie.findById(booking.show.movie);
          booking = booking.toObject();
          booking.show.movie = movie;
        }
        return booking;
      })
    );

    res.json({ success: true, bookings: bookingsWithMovies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
