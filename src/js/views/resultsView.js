//import icons from '../img/icons.svg'; //parcel1
import icons from 'url:../../img/icons.svg'; //parcel2
import previewView from './previewView';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your Query! Please try again';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
