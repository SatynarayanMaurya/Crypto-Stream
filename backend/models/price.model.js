import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    coinId: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number },
    change24h: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Price", priceSchema);
