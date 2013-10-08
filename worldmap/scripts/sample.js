$(document).ready(function () {
    var wm1 = WorldMap({
        id: 'map1',
        selector: '#svgWorldMap1',
        scale: 0.2,
        margin: '0',
        top: '50',
        height: '300',
        width: '550',
        inactiveCountryFill: '#4af',
        inactiveCountryStroke: '#fff',
        inactiveCountryStrokeWidth: 6,
        showCountryBoxOnMouserEnter: true,
        drawNorthAmerica: true,
        drawCentralAmerica: true,
        drawSouthAmerica: true,
        drawEurope: true,
        drawAfrica: true,
        drawAsia: true,
        drawOceania: true,
        drawAntarctic: true,
        onCountryMouseEnter: function (config) {
            var id = config.countryId;
        },
        onCountryMouseMove: function (config) {
            var id = config.countryId;
        },
        onCountryMouseOut: function (config) {
            var id = config.countryId;
        },
        onCountryMouseClick: function (countryId) {
            var id = countryId;
        }
    });

    var wm2 = WorldMap({
        id: 'map2',
        selector: '#svgWorldMap2',
        scale: 0.2,
        margin: '0',
        top: '50',
        height: '300',
        width: '550',
        inactiveCountryFill: 'transparent',
        inactiveCountryStroke: '#ccc',
        inactiveCountryStrokeWidth: 4,
        activeCountryFill: 'orange',
        activeCountryStroke: '#ccc',
        activeCountryStrokeWidth: 0,
        showCountryBoxOnMouserEnter: false,
        drawNorthAmerica: true,
        drawCentralAmerica: true,
        drawSouthAmerica: true,
        drawEurope: true,
        drawAfrica: true,
        drawAsia: true,
        drawOceania: true,
        drawAntarctic: true,
        onCountryMouseEnter: function (config) {
            var id = config.countryId;
        },
        onCountryMouseMove: function (config) {
            var id = config.countryId;
        },
        onCountryMouseOut: function (config) {
            var id = config.countryId;
        },
        onCountryMouseClick: function (countryId) {
            var id = countryId;
        }
    });

    var wm3 = WorldMap({
        id: 'map3',
        selector: '#svgWorldMap3',
        scale: 0.2,
        margin: '0',
        top: '50',
        height: '300',
        width: '550',
        inactiveCountryFill: '#ccc',
        inactiveCountryStroke: 'gray',
        inactiveCountryStrokeWidth: 6,
        activeCountryFill: 'orange',
        activeCountryStroke: 'gray',
        activeCountryStrokeWidth: 6,
        showCountryBoxOnMouserEnter: true,
        drawNorthAmerica: true,
        drawCentralAmerica: true,
        drawSouthAmerica: true,
        drawEurope: true,
        drawAfrica: true,
        drawAsia: true,
        drawOceania: true,
        drawAntarctic: true,
        onCountryMouseEnter: function (config) {
            var id = config.countryId;
        },
        onCountryMouseMove: function (config) {
            var id = config.countryId;
        },
        onCountryMouseOut: function (config) {
            var id = config.countryId;
        },
        onCountryMouseClick: function (countryId) {
            var id = countryId;
        }
    });

    var wm4 = WorldMap({
        id: 'map4',
        selector: '#svgWorldMap4',
        scale: 0.2,
        margin: '0',
        top: '50',
        height: '300',
        width: '550',
        inactiveCountryFill: '#686',
        inactiveCountryStroke: '#fff',
        inactiveCountryStrokeWidth: 6,
        showCountryBoxOnMouserEnter: false,
        drawNorthAmerica: true,
        drawCentralAmerica: true,
        drawSouthAmerica: true,
        drawEurope: true,
        drawAfrica: true,
        drawAsia: true,
        drawOceania: true,
        drawAntarctic: true,
        onCountryMouseEnter: function (config) {
            var id = config.countryId;
        },
        onCountryMouseMove: function (config) {
            var id = config.countryId;
        },
        onCountryMouseOut: function (config) {
            var id = config.countryId;
        },
        onCountryMouseClick: function (countryId) {
            var id = countryId;
        }
    });
});
