import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static defaultProps = {
    id: '',
    webformatURL: '',
    largeImageURL: '',
    tags: '',
  };

  static propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    this.setState.largeImageURL = largeImageURL;
    return (
      <li key={id} className={styles.largeImageURL} onClick={this.toggleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
        />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
