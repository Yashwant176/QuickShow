import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: String, // ✅ matches Movie _id (string from TMDB)
      ref: "Movie",
      required: true,
    },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError when running multiple imports
const Show = mongoose.models.Show || mongoose.model("Show", showSchema);

export default Show;
