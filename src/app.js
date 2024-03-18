const express = require("express")
const bodyParser = require('body-parser');
const geocode = require("../functions/geocode")
const forecast = require("../functions/forecast")

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true })); //parse incoming requests
app.use(express.static('./public'));
app.set("view engine", "hbs");


app.get('/', (req, res) => {
    res.render('index', {
        country: "",
        city: "",
        longitude: "",
        latitude: "",
        weather: ""
    });
});

app.post('/submit', (req, res) => {
    const textInput = req.body.inputTextBox;

    geocode(textInput, (error, dataGeo) => {
        if (error) {
            res.render('index', {
                country: "",
                city: "",
                longitude: "",
                latitude: "",
                weather: "Error fetching data"
            });
        }
        else {
            forecast(dataGeo.longitude, dataGeo.latitude, (error, dataForecast) => {
                if (error) {
                    res.render('index', {
                        country: "",
                        city: "",
                        longitude: "",
                        latitude: "",
                        weather: "Error fetching data"
                    });
                }
                else {
                    res.render('index', {
                        country: dataForecast.country,
                        city: dataForecast.city,
                        longitude: dataGeo.longitude,
                        latitude: dataGeo.latitude,
                        weather: dataForecast.weather,
                        showResults: true
                    });
                }
            });
        }
    });
});


app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})