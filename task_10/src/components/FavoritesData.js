/**
 * Favorites
 * local storage
 * version 1.2
 */
class FavoritesData {
	constructor(props) {
		this.props = props;
		this.state = {
			data: JSON.parse(localStorage.getItem(this.props.prefix+'-favorites')) || [],
			add: '',
			del: '',
		};
		this.container = document.createElement('div');
		this.container.id = 'favorites';
		this.container.addEventListener('click', this.handleClick.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.onAfterUpdate(nextState);
		return this.render();
	}

	onAfterUpdate(nextState) {
		if (nextState.add && nextState.add.length) 
		{
			if (this.state.data.indexOf(nextState.add) < 0) this.state.data.push(nextState.add);
		}
		if (nextState.del && nextState.del.length) 
		{
			const pos = this.state.data.indexOf(nextState.del);
			if (pos >= 0) this.state.data.splice(pos, 1);
		}
	}

	render() {
		const list = this.state.data.length > 0 ? '<ul>' + 
		this.state.data.slice().reverse().map(value => `<li>${value}</li>`).join('') + '</ul>' : '';

		this.container.innerHTML = `
		<div class="topbox">
			<h3>&#9733; Favorites</h3>
			<button name="favoritesclear"${(!list ? ' disabled' : '')}>Clear all</button>
		</div>
		${list}`;

		return this.container;
	}

	handleClick(e) {
		if (e.target.nodeName === 'LI') this.props.onClickFavorite(e.target.textContent);
		if (e.target.nodeName === 'BUTTON' && e.target.name === 'favoritesclear') this.props.onClearFavorite();
	}

	check(value) {
		return (this.state.data.indexOf(value) < 0) ? false : true;
	}

	unload() {
		localStorage.setItem(this.props.prefix+'-favorites', JSON.stringify(this.state.data.slice(-this.props.limit)));
	}
}

export default FavoritesData;
