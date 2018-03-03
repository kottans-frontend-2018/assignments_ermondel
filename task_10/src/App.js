/**
 * App.js
 * version 1.4
 */
import SearchForm      from './components/SearchForm';
import ForecastHeader  from './components/ForecastHeader';
import ForecastData    from './components/ForecastData';
import FavoritesData   from './components/FavoritesData';
import HistoryData     from './components/HistoryData';
import { getForecast } from './utils/api';

class App {
	constructor() {
		this.state = {
			formSearch: '',
			headerForecast: '',
			dataForecast: '',
			dataFavorites: '',
			dataHistory: '',
		};

		this.appName = 'weather-app';

		this.header  = document.getElementById('header-inner');
		this.main    = document.getElementById('main-inner');
		this.aside   = document.getElementById('aside-inner');

		this.searchForm = new SearchForm({
			onSubmit:       this.onSubmit.bind(this),
			onChangePeriod: this.onChangePeriod.bind(this),
			onChangeUnit:   this.onChangeUnit.bind(this),
		});
		this.forecastHeader = new ForecastHeader({
			onAddFavorite: this.onAddFavorite.bind(this),
			onDelFavorite: this.onDelFavorite.bind(this),
		});
		this.forecastData  = new ForecastData({});
		this.favoritesData = new FavoritesData({
			prefix: this.appName,
			limit: 15,
			onClickFavorite: this.onClickFavorite.bind(this),
			onClearFavorite: this.onClearFavorite.bind(this),
		});
		this.historyData   = new HistoryData({
			prefix: this.appName,
			limit: 20,
			onClickHistory: this.onClickHistory.bind(this),
			onClearHistory: this.onClearHistory.bind(this),
		});
		window.addEventListener('unload', this.onWindowUnload.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.onAfterUpdate(nextState);
	}

	onAfterUpdate(nextState) {
		// search
		if (nextState.formSearch) {
			this.header.innerHTML = '<h1>Weather forecast for the city up to 2 weeks</h1>';
			if (this.state.formSearch) this.header.appendChild(this.state.formSearch);
		}

		// forecast
		if (nextState.headerForecast || nextState.dataForecast) {
			this.main.innerHTML = '';
			if (this.state.headerForecast) this.main.appendChild(this.state.headerForecast);
			if (this.state.dataForecast) this.main.appendChild(this.state.dataForecast);
		}

		// favorites and history
		if (nextState.dataFavorites || nextState.dataHistory) {
			this.aside.innerHTML = '';
			if (this.state.dataFavorites) this.aside.appendChild(this.state.dataFavorites);
			if (this.state.dataHistory) this.aside.appendChild(this.state.dataHistory);
		}
	}

	init() {
		this.updateState({
			formSearch: this.searchForm.updateState({}),
			dataFavorites: this.favoritesData.updateState({}),
			dataHistory: this.historyData.updateState({}),
		});

		const city = new URLSearchParams(window.location.search).get('city') || '';
		if (city) this.onSubmit(city.replace('_', ' '));
	}


	onSubmit(city) {
		getForecast(city).then(data => {
			history.pushState({}, "Forecast for " + data.city_name, "?city=" + data.city_name.replace(' ', '_'));
			this.searchForm.updateProps({city: data.city_name});
			this.updateState({
				headerForecast: this.forecastHeader.updateState({ valid: true, data, favorite: this.favoritesData.check(data.city_name) }),
				dataForecast: this.forecastData.updateState({ valid: true, data }),
				dataHistory: this.historyData.updateState({ add: data.city_name }),
			});
		}).catch(error => {
			this.searchForm.updateProps({ city });
			this.updateState({
				headerForecast: this.forecastHeader.updateState({ valid: false }),
				dataForecast: this.forecastData.updateState({ valid: false }),
			});
		});
	}

	onChangePeriod(period) {
		this.updateState({
			dataForecast: this.forecastData.updateState({ period }),
		});
	}

	onChangeUnit(unit) {
		this.updateState({
			dataForecast: this.forecastData.updateState({ unit }),
		});
	}

	onAddFavorite(city) {
		this.updateState({
			dataFavorites: this.favoritesData.updateState({add: city}),
		});
	}

	onDelFavorite(city) {
		this.updateState({
			dataFavorites: this.favoritesData.updateState({del: city}),
		});
	}

	onClickFavorite(city) {
		this.onSubmit(city);
	}

	onClearFavorite() {
		this.updateState({
			headerForecast: this.forecastHeader.updateState({ favorite: false }),
			dataFavorites: this.favoritesData.updateState({ data: [] }),
		});
	}

	onClickHistory(city) {
		this.onSubmit(city);
	}

	onClearHistory() {
		this.updateState({
			dataHistory: this.historyData.updateState({ data: [] }),
		});
	}

	onWindowUnload(e) {
		this.favoritesData.unload();
		this.historyData.unload();
	}
}

export default App;
