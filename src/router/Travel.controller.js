import { countryCodes } from "../data/CountryNameToCode.js";
import HotelModel from "../model/Hotel.model.js";
export const countryNames = async (req, res) => {
    const countries = await HotelModel.find();
    const count = countries.map((item) => item.country);
    res.status(200).json(count);
};

export const flight = async (req, res) => {
    const { from, to, type, date } = req.body;

    const url = `https://flight-fare-search.p.rapidapi.com/v2/flights/?from=${countryCodes[from]}&to=${countryCodes[to]}&date=${date}&adult=1&type=${type}&currency=USD`;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.APIKEY,
            "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        res.status(200).json(result.results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something went wrong" });
    }
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
