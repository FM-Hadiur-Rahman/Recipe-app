//import icons from '../img/icons.svg'; //parcel1
import icons from 'url:../../img/icons.svg'; //parcel2
import previewView from './previewView';
import View from './view';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No recipes found for your Query! Please try again';
  _successMessage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
