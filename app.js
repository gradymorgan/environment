var BMP280 = require('node-bmp280');

exports.load = function(server, boatData, settings) {
	var barometer = new BMP280();

    setInterval(function() {
        barometer.readPressureAndTemparature(function(err, pressure, temperature) {
            boatData.broadcast({
                type: 'data',
                subtype: 'env',
                values: [
                	"P",
                	pressure,
                	"T", 
                	temperature
                ]
            });
        });
    }, 1000);
};