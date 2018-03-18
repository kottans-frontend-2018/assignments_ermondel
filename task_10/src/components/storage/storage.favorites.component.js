/**
 * Storage Favorites Component
 * version 1.0
 * props
 *	favorites
 *	onClickStorage
 *	onDelFavorite
 */
import Component from '../../Component';

class StorageFavorites extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'favorites';
		this.container.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(e) {
		if (e.target.nodeName === 'LI') this.props.onClickStorage(e.target.textContent);
		if (e.target.nodeName === 'BUTTON' && e.target.name === 'favoritesclear') this.props.onDelFavorite();
	}

	render() {
		const favorites = this.props.favorites.length ? this.props.favorites : null;
		
		const list = favorites ? '<ul>' + favorites.map(value => `<li>${value}</li>`).join('') + '</ul>' : '';

		return `
		<div class="topbox">
			<h3>&#9733; Favorites</h3>
			<button name="favoritesclear"${(!list ? ' disabled' : '')}>Clear all</button>
		</div>
		${list}`;
	}
}

export default StorageFavorites;
