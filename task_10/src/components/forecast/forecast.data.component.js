/**
 * Forecast Data Component
 * version 1.0
 * props
 *	valid
 *	isCelsius
 *	period
 *	forecast
 *	waiting
 */
import Component    from '../../Component';
import DayForecast  from './dayforecast';
import weatherIcons from './weather-icons/*';

class ForecastData extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
	}

	render() {
		const { valid }     = this.props;
		const { isCelsius } = this.props;
		const { period }    = this.props;
		const { waiting }   = this.props;
		const forecasts     = this.props.forecast && this.props.forecast.data || null;

		if (valid && !waiting && forecasts) {
			this.container.id = 'forecasts';
			return forecasts.slice(0, period).map(data => DayForecast(data, isCelsius, weatherIcons)).join('');
		}
		if (waiting) {
			this.container.id = 'forecast-loading';
			return `<img src="${weatherIcons['forecast-loading.gif']}" alt="Loading">`;
		}
		if (!valid) {
			this.container.id = 'forecast-error';
			return `<img src="${weatherIcons['forecast-error.jpg']}" alt="No forecast available"><div>No forecast available.</div>`;
		}

		return '';
	}
}

export default ForecastData;
