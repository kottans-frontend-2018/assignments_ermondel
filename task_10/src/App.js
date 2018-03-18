/**
 * App
 * version 1.0
 * props
 *	container
 */
import Component              from './component';
import { getForecast }        from './api';
import SearchFormComponent    from './components/search/search.form.component';
import ForecastHostComponent  from './components/forecast/forecast.host.component';
import StorageHostComponent   from './components/storage/storage.host.component';
import { cityFromLoc, cityToLoc, cityUppercase } from './utils';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			city      : '',
			period    : 3,
			isCelsius : true,
			forecast  : {},
			valid     : true,
			waiting   : false,
			favorites : JSON.parse(localStorage.getItem('weather-app-favorites')) || [],
			history   : JSON.parse(localStorage.getItem('weather-app-history')) || [],
		};

		this.container = this.props.container;

		this.searchForm = new SearchFormComponent({
			onSubmit       : this.onSubmit.bind(this),
			onChangePeriod : this.onChangePeriod.bind(this),
			onChangeUnit   : this.onChangeUnit.bind(this),
			city           : this.state.city,
			period         : this.state.period,
			isCelsius      : this.state.isCelsius,
		});
		this.forecastHost = new ForecastHostComponent({
			valid          : this.state.valid,
			isCelsius      : this.state.isCelsius,
			forecast       : this.state.forecast,
			onAddFavorite  : this.onAddFavorite.bind(this),
			onDelFavorite  : this.onDelFavorite.bind(this),
		});
		this.storageHost = new StorageHostComponent({
			favorites      : this.state.favorites,
			history        : this.state.history,
			onClickStorage : this.onClickStorage.bind(this),
			onDelFavorite  : this.onDelFavorite.bind(this),
			onDelHistory   : this.onDelHistory.bind(this),
		});

		window.addEventListener('unload', this.onWindowUnload.bind(this));
	}

	init() {
		const city = cityFromLoc();
		city ? this.updateState({ city, waiting: true }) : this.updateState();
	}

	onSubmit(city) {
		this.updateState({ city, waiting: true });
	}

	onClickStorage(city) {
		this.updateState({ city, waiting: true });
	}

	onChangePeriod(period) {
		this.updateState({ period });
	}

	onChangeUnit(val) {
		const isCelsius = val === 'celsius' ? true : false;
		this.updateState({ isCelsius });
	}

	onAddFavorite(city) {
		const { favorites } = this.state;

		favorites.indexOf(city) < 0 && favorites.unshift(city);

		this.updateState({ favorites });
	}

	onDelFavorite(city) {
		let { favorites } = this.state;

		if (city) {
			const pos = favorites.indexOf(city);
			if (pos >= 0) favorites.splice(pos, 1);
		} else {
			favorites = [];
		}

		this.updateState({ favorites });
	}

	onDelHistory() {
		this.updateState({ history: [] });
	}

	onWindowUnload() {
		let { favorites } = this.state;
		let { history }   = this.state;

		favorites = favorites.slice(-15); // favorites limit
		history   = history.slice(-20);   // history limit

		localStorage.setItem('weather-app-favorites', JSON.stringify(favorites));
		localStorage.setItem('weather-app-history', JSON.stringify(history));
	}

	onBeforeUpdate(nextState) {
		if (nextState && nextState.city) nextState.city = cityUppercase(nextState.city);
	}

	onAfterUpdate(nextState) {
		if (nextState && nextState.city) this.forecast(nextState.city);
	}

	forecast(city) {
		getForecast(city).then(forecast => {
			const { history } = this.state;
			history.indexOf(city) < 0 && history.unshift(city);
			cityToLoc(city, `Weather app :: forecast for ${city}`);
			document.title = `Forecast for ${city}`;

			this.updateState({waiting: false, valid: true, forecast, history });
		}).catch(error => {
			document.title = `No forecast available for ${city}`;

			this.updateState({waiting: false, valid: false});
		});
	}

	render() {
		const { city }      = this.state;
		const { period }    = this.state;
		const { isCelsius } = this.state;
		const { valid }     = this.state;
		const { forecast }  = this.state;
		const { favorites } = this.state;
		const { history }   = this.state;
		const { waiting }   = this.state;
		const favorite      = !!(favorites.indexOf(city)+1);

		return [
			this.searchForm.update({ city, period, isCelsius }),
			this.forecastHost.update({ city, period, isCelsius, valid, forecast, favorite, waiting }),
			this.storageHost.update({ favorites, history }),
		];
	}
}

export default App;
