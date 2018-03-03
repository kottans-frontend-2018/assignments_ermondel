/**
 * ForecastData.js
 * version 1.4
 */
import {filesManyToOne, D_Month_Y, temperatureCtoF} from '../utils/utils';
import weatherIcons from './weather-icons/*';

class ForecastData {
	constructor(props) {
		this.state = {
			valid: true,
			data: {},
			period: 3,
			unit: 'celsius',
		};
		this.props = props;
		this.container = document.createElement('div');
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		return this.render();
	}

	render() {
		if (this.state.valid) {
			if (this.state.data.data && this.state.data.data.length > 0) 
			{
				const weather_icons = {
					'ico-01': 'c01d',
					'ico-03': 'c04d',
					'ico-02': 'c03d;c02d;c02d',
					'ico-04': 'a06d;a05d;a04d;a03d;a02d;a01d',
					'ico-06': 't05d;t04d;t04d;t04d;t03d;t02d;t01d',
					'ico-05': 'u00d;r06d;r05d;r04d;f01d;r03d;r02d;r01d',
					'ico-07': 's06d;s02d;s01d;s05d;s05d;s04d;s03d;s02d;s01d;d03d;d02d;d01d',
				}

				const content = this.state.data.data.slice(0, this.state.period).map(data => {
					// unit
					const temp_avg = this.state.unit === 'fahrenheit' ? temperatureCtoF(data.temp)     + '°F' : data.temp     + '°C';
					const temp_max = this.state.unit === 'fahrenheit' ? temperatureCtoF(data.max_temp) + '°F' : data.max_temp + '°C';
					const temp_min = this.state.unit === 'fahrenheit' ? temperatureCtoF(data.min_temp) + '°F' : data.min_temp + '°C';

					// weather icon
					const icon = filesManyToOne(data.weather.icon, weather_icons)+'.png';

					// block
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
				}).join('');

				this.container.id = 'forecasts';
				this.container.innerHTML = content;
				return this.container;
			} else {
				return '';
			}
		} else {
			const content = `<img src="${weatherIcons['forecast-error.png']}" alt="No forecast available"><div>No forecast available.</div>`;
			this.container.id = 'forecast-error';
			this.container.innerHTML = content;
			return this.container;
		}
	}
}

export default ForecastData;
