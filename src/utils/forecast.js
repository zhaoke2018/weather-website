const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=87292942a799e29532c121bf0735b454&query=' +latitude + ',' + longtitude;

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const responseInfo = "It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out."
            callback(undefined, responseInfo);
        }
    });
};

module.exports = forecast;