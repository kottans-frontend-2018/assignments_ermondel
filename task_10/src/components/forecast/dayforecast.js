/**
 * Day Forecast
 * version 1.0
 */
import {filesManyToOne, D_Month_Y, CelsiusToFahrenheit} from '../../utils';

const weather_icons_map = {
	'ico-01': 'c01d',
	'ico-03': 'c04d',
	'ico-02': 'c03d;c02d;c02d',
	'ico-04': 'a06d;a05d;a04d;a03d;a02d;a01d',
	'ico-06': 't05d;t04d;t04d;t04d;t03d;t02d;t01d',
	'ico-05': 'u00d;r06d;r05d;r04d;f01d;r03d;r02d;r01d',
	'ico-07': 's06d;s02d;s01d;s05d;s05d;s04d;s03d;s02d;s01d;d03d;d02d;d01d',
};

const DayForecast = (data, isCelsius = true, weatherIcons) => {
	const temp_avg = isCelsius ? data.temp     + '°C' : CelsiusToFahrenheit(data.temp)     + '°F';
	const temp_max = isCelsius ? data.max_temp + '°C' : CelsiusToFahrenheit(data.max_temp) + '°F';
	const temp_min = isCelsius ? data.min_temp + '°C' : CelsiusToFahrenheit(data.min_temp) + '°F';

	const icon = filesManyToOne(data.weather.icon, weather_icons_map)+'.png';

	return `
	<div class="forecast">
		<div class="forecast-date">${D_Month_Y(data.ts)}</div>
		<div class="forecast-description">${data.weather.description}</div>
		<div class="forecast-img"><img src="${weatherIcons[icon]}" alt="${data.weather.description}"></div>
		<div class="forecast-temp-avg">${temp_avg}</div>
		<div class="forecast-max-temp-app fl">Maximum temperature <span class="fv">${temp_max}</span></div>
		<div class="forecast-min-temp-app fl">Minimum temperature <span class="fv">${temp_min}</span></div>
		<div class="forecast-pres fl">Pressure <span class="fv">${data.pres} mb</span></div>
		<div class="forecast-rh fl">Humidity <span class="fv">${data.rh} %</span></div>
		<div class="forecast-wind_spd fl">Wind <span class="fv">${data.wind_cdir_full}, ${data.wind_spd} m/s</span></div>
	</div>`;
};

export default DayForecast;

