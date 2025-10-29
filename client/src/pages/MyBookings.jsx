import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user, image_base_url } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setBookings(data.bookings);
    } catch (error) {
      console.error("getMyBookings error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh bookings after successful payment redirect
  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-400">You don’t have any bookings yet.</p>
      )}

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-3 md:p-4 max-w-3xl"
        >
          {/* Left side */}
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt={item.show.movie.title}
              className="md:w-44 aspect-video object-cover object-bottom rounded"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">{item.show.movie.title}</p>
                <p className="text-gray-400 text-sm">
                  {timeFormat(item.show.movie.runtime)}
                </p>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {dateFormat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col md:items-end md:text-right justify-between mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <Link
                  to={item.paymentLink}
                  className="bg-primary px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer whitespace-nowrap"
                >
                  Pay Now
                </Link>
              )}
            </div>
            <div className="text-sm mt-2">
              <p>
                <span className="text-gray-400">Total Tickets:</span>{" "}
                {item.bookedSeats.length}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span>{" "}
                {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
