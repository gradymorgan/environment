var BMP280 = require('node-bmp280');

exports.load = function(server, boatData, settings) {
	var barometer = new BMP280();
    
    barometer.begin(function(err) {
        if (err) {
            console.error('unable to initialize barometer', err);
            return;
        }
        setInterval(function() {
            barometer.readPressureAndTemparature(function(err, pressure, temperature) {
                boatData.broadcast({
                    type: 'DATA',
                    subtype: 'ENV',
                    values: [
                        "P",
                        pressure,
                        "T", 
                        temperature
                    ]
                });
            });
        }, 1000);
    });
};