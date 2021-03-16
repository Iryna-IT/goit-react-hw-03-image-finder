import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import getImages from '../services/getImages';

import Searchbar from '../components/Searchbar';
import Load from '../components/Loader';
import ImageGallery from './ImageGallery';
import Button from '../components/Button';

import styles from './App.module.css';

class App extends Component {
  state = {
    gallery: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImageGallery();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      gallery: [],
    });
  };

  fetchImageGallery = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { q: searchQuery, page: currentPage };
    this.setState({ isLoading: true });

    this.setState({ isLoading: true });
    getImages(options)
      .then(images => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { gallery, searchQuery, isLoading, error } = this.state;
    return (
      <div className={styles.App}>
        {error && <h1>Something happens wrong, try again</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery gallery={gallery} />
        {isLoading && <Load />}
        {gallery.length > 11 && !isLoading && (
          <Button onClick={this.fetchImageGallery} />
        )}
        {gallery.length === 0 && searchQuery !== '' && <div>Nothing found</div>}
      </div>
    );
  }
}

export default App;
