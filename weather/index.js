"use strict";

const axios=require("axios");
const apikey="a3686e82e1f80a0fa556447070573e05";

const getWeather = location =>{
    return new Promise(async (resolve, reject) =>
    {
        try{
            const params = {
                access_key: apikey,
                query: location,
                days: 7,
                hourly:1
            }            
            const weatherConditions = axios.get('http://api.weatherstack.com/forecast', {params});
            resolve(weatherConditions)
        }
        catch(error)
        {
            reject(error);
        }
    });
}

module.exports = getWeather;