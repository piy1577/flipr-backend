import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    
});

export default mongoose.model("hotel", hotelSchema);
