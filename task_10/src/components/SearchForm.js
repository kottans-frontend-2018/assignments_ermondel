/**
 * SearchForm.js
 * version 1.0
 */
class SearchForm {
	constructor(props) {
		this.state = {
			placeholder: 'e.g. New York',
		};
		this.props = props;
		this.container = document.createElement('form');
		this.container.id = 'form';
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('change', this.handlerChange.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		return this.render();
	}

	updateProps(nextProps) {
		this.props = Object.assign({}, this.props, nextProps);
		this.onAfterUpdate(nextProps);
	}

	onAfterUpdate(nextProps) {
		if (nextProps.city && nextProps.city.length) 
		{
			this.container.city.value = nextProps.city;
		}
	}

	handlerSubmit(e) {
		e.preventDefault();
		const value = e.target.elements.city.value.trim();
		if (value) this.props.onSubmit(value);
	}

	handlerChange(e) {
		if (e.target.type === 'radio') 
		{
			if (e.target.name === 'period') this.props.onChangePeriod(e.target.value);
			if (e.target.name === 'unit') this.props.onChangeUnit(e.target.value);
		}
	}

	render() {
		this.container.innerHTML = `
		<div class="left">
			<div id="search-box">
				<label for="city" class="visuallyhidden" tabindex="0">Choose the city of your interest</label>
				<input type="text" name="city" id="city" placeholder="${this.state.placeholder}" required>
			</div>
			<div id="options">
				<div id="options-period">
					<label class="common-radio" tabindex="0">
						<input type="radio" required name="period" value="1">
						<span>day</span>
        			</label>
        			<label class="common-radio" tabindex="0">
            			<input type="radio" required name="period" value="3" checked>
            			<span>3 days</span>
        			</label>
        			<label class="common-radio" tabindex="0">
            			<input type="radio" required name="period" value="7">
            			<span>week</span>
        			</label>
        			<label class="common-radio" tabindex="0">
            			<input type="radio" required name="period" value="14">
            			<span>2 weeks</span>
        			</label>
        		</div>
        		<div id="options-unit">
        			<label class="common-radio" tabindex="0">
            			<input type="radio" required name="unit" value="celsius" checked>
            			<span>Celsius</span>
        			</label>
        			<label class="common-radio" tabindex="0">
            			<input type="radio" required name="unit" value="fahrenheit">
            			<span>Fahrenheit</span>
        			</label>
        		</div>
        	</div>
		</div>
		<div class="right">
			<input type="submit" value="Submit" id="submit" tabindex="0">
		</div>`;
		return this.container;
	}
}

export default SearchForm;
