import { Component } from 'react';
import SearchBar from './SearchBar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
export default class App extends Component {
  state = {
    searchQuery: null,
  };
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
      </div>
    );
  }
}
