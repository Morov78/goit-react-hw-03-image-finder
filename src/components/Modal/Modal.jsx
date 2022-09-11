import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';

const ModalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
    // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // window.onscroll = function () {
    //   window.scrollTo(0, scrollTop);
    // };
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
    // window.onscroll = function () {};
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log('нажали Escape');
      this.props.onClose();
    }
  };
  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      console.log('Click on backfrop');
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      ModalRoot
    );
  }
}
