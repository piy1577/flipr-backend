import { countryCodeToCountryName } from "../data/CountryCodeToCountryName.js";
import { countryCodes } from "../data/CountryNameToCode.js";

export const countryNames = async (req, res) => {
    const url = "https://hotels4.p.rapidapi.com/v2/get-meta-data";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.APIKEY,
            "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const country = Object.values(result).map(
            (item) => countryCodeToCountryName[item.countryCode]
        );
        res.status(200).send(country);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Something went wrong" });
    }
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
