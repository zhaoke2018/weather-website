const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Ke'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ke Ke'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'helpful example',
        name: 'KEKEKE'
    });
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        } 
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
            
        });
    });

    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ke',
        errorMessage: 'help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ke',
        errorMessage: 'page not found'
    });
});

app.listen(3001, () => {
    console.log('server run successfully!');
});

// test