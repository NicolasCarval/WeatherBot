"use strict ";

const { Console } = require("console");
const Readline = require("readline");
const { Z_NO_COMPRESSION } = require("zlib");


const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})
const axios = require('axios');
const weather = require("./weather");
const matcher = require(`./matcher`);
rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
    matcher(reply, cb => {
        let tmDate
        switch (cb.intent) {
            case "Hello":
                console.log(`Hello, how can i help you today ?`);                
                break;
            case "Chatbot competence":
                console.log("I can give you :\n\n" +
                    "- the weather of any city in the world,\n- if it is sunny, cold or not.\n" +
                    "- Wind informations\n- UV informations\n- Today, tomorrow, the day after!!\n\nSo feel free to ask ;)")
                break;
            case "Exit":
                console.log("Good bye, have a nice day");
                process.exit(0);
                break;
            case "Wind":
                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    const windInfo = `Here are some info on the wind in \x1b[34m${apiResponse.location.name},${apiResponse.location.country}\x1b[0m:\n` +
                        `- Wind Speed : \x1b[33m${apiResponse.current.wind_speed} Km/h\x1b[0m\n` +
                        `- Wind Direction : \x1b[33m${apiResponse.current.wind_dir}\x1b[0m`
                    console.log(windInfo);
                }).catch(error => {
                    if (error instanceof TypeError) {
                        console.log("The city isn't valid, please correct its name or change city !")
                    } else {
                        console.log(error);
                    }
                });
                break;
            case "current weather":

                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    console.log(`It is \x1b[33m${temperature(apiResponse.current.temperature)}\x1b[0m in \x1b[34m${apiResponse.location.name},${apiResponse.location.country}\x1b[0m with \x1b[33m${apiResponse.current.temperature}°C\x1b[0m.` +
                        `\nThe weather is \x1b[33m${apiResponse.current.weather_descriptions}\x1b[0m.`);
                }).catch(error => {
                    if (error instanceof TypeError) {
                        console.log("The city isn't valid, please correct its name or change city !")
                    } else {
                        console.log(error);
                    }
                });
                break;
            case "Solar cream":
                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    console.log(`The uv index is \x1b[33m${apiResponse.current.uv_index}\x1b[0m which corresponds to a ${UV(apiResponse.current.uv_index)}\x1b[0m in \x1b[34m${apiResponse.location.name}\x1b[0m,${apiResponse.location.country}`);
                }).catch(error => {
                    if (error instanceof TypeError) {
                        console.log("The city isn't valid, please correct its name or change city !")
                    } else {
                        console.log(error);
                    }
                });
                break;
            case "tomorrow weather":
                var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                var day = currentDate.getDate()
                var month = currentDate.getMonth() + 1
                var year = currentDate.getFullYear()
                if (day < 10) day = "0" + day
                if (month < 10) month = "0" + month
                tmDate = year + "-" + month + "-" + day;
                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    console.log(`Tomorrow temperature in \x1b[34m${apiResponse.location.name},${apiResponse.location.country}\x1b[0m is \x1b[33m${apiResponse.forecast[tmDate].avgtemp}°C\x1b[0m.`);
                }).catch(error => {
                    if (error instanceof TypeError) {
                        console.log("It doesn't work because you need to pay to get forecast values")
                    } else {
                        console.log(error);
                    }
                });
                console.log(`We would have gave you the weather for ${cb.entities.city} for the date : ${tmDate}`);
                break;
            case "question hot or cold":
                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    if (cb.entities.time == null || cb.entities.time == "today") {
                        console.log(`It is \x1b[33m${temperature(apiResponse.current.temperature)}\x1b[0m in \x1b[34m${apiResponse.location.name},${apiResponse.location.country}\x1b[0m today`);
                    }
                    else {
                        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                        var day = currentDate.getDate()
                        var month = currentDate.getMonth() + 1
                        var year = currentDate.getFullYear()
                        if (day < 10) day = "0" + day
                        if (month < 10) month = "0" + month
                        tmDate = year + "-" + month + "-" + day;
                        console.log(`It will be \x1b[33m${temperature(apiResponse.forecast[tmDate].avgtemp)}\x1b[0m in \x1b[34m${apiResponse.location.name}\x1b[0m tomorrow`);
                        console.log("It doesn't work because you need to pay to get forecast values");
                    }
                }).catch(error => {
                    if (cb.entities.time == null || cb.entities.time == "today") {
                        if (error instanceof TypeError) {
                            console.log("The city isn't valid, please correct its name or change city !")
                        } else {
                            console.log(error);
                        }
                    }
                    else {
                        if (error instanceof TypeError) {
                            console.log("It doesn't work because you need to pay to get forecast values")
                        } else {
                            console.log(error);
                        }
                        console.log(`We would have gave you the answer for ${cb.entities.city} for the date : ${tmDate}`);
                    }
                    
                });
                break;
            case "question rainy sunny":
                weather(cb.entities.city).then(response => {
                    const apiResponse = response.data;
                    if (cb.entities.time == null || cb.entities.time == "today") {
                        console.log(`The weather is \x1b[33m${apiResponse.current.weather_descriptions}\x1b[0m today in \x1b[34m${apiResponse.location.name},${apiResponse.location.country}\x1b[0m.`)
                    }
                    else if (cb.entities.time == "tomorrow") {
                        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                        var day = currentDate.getDate()
                        var month = currentDate.getMonth() + 1
                        var year = currentDate.getFullYear()
                        if (day < 10) day = "0" + day
                        if (month < 10) month = "0" + month
                        tmDate = year + "-" + month + "-" + day;
                        console.log(`It will be \x1b[33m${temperature(apiResponse.forecast[tmDate].hourly[2].weather_descriptions)}\x1b[0m in \x1b[34m${apiResponse.location.name}\x1b[0m tomorrow`);
                        console.log("It doesn't work because you need to pay to get forecast values");
                    }
                    else {
                        var currentDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
                        var day = currentDate.getDate()
                        var month = currentDate.getMonth() + 1
                        var year = currentDate.getFullYear()
                        if (day < 10) day = "0" + day
                        if (month < 10) month = "0" + month
                        const tmDate = year + "-" + month + "-" + day;
                        console.log(`It will be \x1b[33m${apiResponse.forecast[tmDate].hourly[2].weather_descriptions}\x1b[0m in \x1b[34m${apiResponse.location.name}\x1b[0m tomorrow`);
                        console.log("It doesn't work because you need to pay to get forecast values");
                    }
                }).catch(error => {
                    if (cb.entities.time == null || cb.entities.time == "today") {
                        if (error instanceof TypeError) {
                            console.log("The city isn't valid, please correct its name or change city !")
                        } else {
                            console.log(error);
                        }
                    }
                    else {
                        if (error instanceof TypeError) {
                            console.log("It doesn't work because you need to pay to get forecast values")
                        } else {
                            console.log(error);
                        }
                        console.log(`We would have gave you the answer for ${cb.entities.city} for the date : ${tmDate}`);
                    }
                });
                break;
            default:
                console.log("I didn't understand\nMaybe try to add 'today' or 'tomorrow' at the end if you think i am able to resolve your request ;)");
        }
    });
    rl.prompt();
});

function temperature(temp) {
    let val = ""
    if (temp < 0) val = "very cold"
    else if (temp < 10) val = "quite cold"
    else if (temp < 20) val = "a mild weather"
    else if (temp < 30) val = "hot"
    else val = "very hot"
    return val
}

function UV(level) {
    let val = ""
    if (level < 3) val = "\x1b[33mWeak level\x1b[0m : You should wear \x1b[33mglasses\x1b[0m for a sunny day"
    else if (level < 6) val = "\x1b[33mModerate level\x1b[0m : You should wear a \x1b[33mhat,sunglasses and apply solar cream 15+\x1b[0m "
    else if (level < 8) val = "\x1b[33mHigh level\x1b[0m : You should wear a \x1b[33mhat,sunglasses and apply solar cream 30+\x1b[0m "
    else if (level < 11) val = "\x1b[33mVery High level\x1b[0m : Don't expose your skin, plus you should wear a \x1b[33mhat,sunglasses and apply solar cream 50+\x1b[0m"
    else val = "\x1b[33mExtrem level : Don't go out, or do it quick with highest precautions possibles\x1b[0m "
    return val
}






