/**
 * Storage Host Component
 * version 1.0
 * @ StorageFavorites props favorites, onClickStorage, onDelFavorite
 * @ StorageHistory props history, onClickStorage, onDelHistory
 */
import Component from '../../Component';
import StorageFavoritesComponent from './storage.favorites.component'; 
import StorageHistoryComponent from './storage.history.component';

class StorageHost extends Component {
	constructor(props) {
		super(props);

		this.inner     = document.createElement('div');
		this.inner.id  = 'aside-inner';
		this.container    = document.createElement('aside');
		this.container.id = 'aside';

		this.hover = document.createElement('div');
		this.hover.id = 'aside-marker';
		this.hover.innerHTML = '<span class="out">&#10097;</span><span class="over">&#10096;</span>';

		this.storageFavorites = new StorageFavoritesComponent(props);
		this.storageHistory = new StorageHistoryComponent(props);
	}

	render() {
		const { favorites } = this.props;
		const { history }   = this.props;

		return [
			this.storageFavorites.update({ favorites }),
			this.storageHistory.update({ history }),
			this.hover,
		];
	}
}

export default StorageHost;
