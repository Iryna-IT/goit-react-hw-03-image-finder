import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  state = { largeImageURL: '' };

  static defaultProps = {
    gallery: [],
  };

  render() {
    const { gallery } = this.props;
    return (
      <ul className={styles.ImageGallery}>
        {gallery.map(item => (
          <ImageGalleryItem
            key={item.id}
            id={item.id}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            tags={item.tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
