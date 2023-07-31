import HotelModel from "../model/Hotel.model.js";

export const countryNames = async (req, res) => {
    const countries = await HotelModel.find();
    let count = countries.map((item) => item.country);
    const set = new Set(count);
    count = [];
    count = [...set];
    count.sort();
    res.status(200).json(count);
};

export const hotel = async (req, res) => {
    const { area } = req.body;
    try {
        const hotels = await HotelModel.find({ country: area });
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something went wrong" });
    }
};

export const hotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await HotelModel.findById(id);
        if (hotel) {
            res.status(200).json(hotel);
        } else {
            res.status(400).json({ message: "something went wrong" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" });
    }
};
