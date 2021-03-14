import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    const { onClick } = this.props;
    return (
      <button type="button" className={styles.buttonLoad} onClick={onClick}>
        Load more
      </button>
    );
  }
}
export default Button;
