import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import Searchbar from '../components/Searchbar';
import Load from '../components/Loader';
import ImageGallery from './ImageGallery';
import Button from '../components/Button';

import styles from './App.module.css';

class App extends Component {
  state = {
    key: '19878712-8b5821339c38877bcf5918ddb',
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
    this.setState({ searchQuery: query, currentPage: 1, gallery: [] });
  };

  fetchImageGallery = () => {
    const { key, currentPage, searchQuery } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${key}`,
      )
      .then(response => response)
      .then(dataSet => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...dataSet.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }))
      .catch(error => this.setState({ error: error }));
  };

  render() {
    const { gallery, searchQuery, isLoading, error } = this.state;
    return (
      <div className={styles.App}>
        {error && <h1>Something happens wrong, try again</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery gallery={gallery} searchQuery={searchQuery} />
        {isLoading && <Load />}
        {gallery.length > 11 && !isLoading && (
          <Button onClick={this.fetchImageGallery} />
        )}
      </div>
    );
  }
}

export default App;
