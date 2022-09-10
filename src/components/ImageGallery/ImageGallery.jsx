import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';
import API from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class ImageGallery extends Component {
  state = {
    query: null,
    page: null,
    pictures: [],
    error: null,
    status: Status.IDLE,
    loadMore: false,
  };
  clickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('GalleryDidUpdate');
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    console.log(prevSearchQuery, ' == Props ==', nextSearchQuery);
    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({
        query: nextSearchQuery,
        page: 1,
        loadMore: false,
        status: Status.IDLE,
        pictures: [],
        error: null,
      });
      return;
    }
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    console.log(prevQuery, ' == query ==', nextQuery);
    console.log(prevPage, '== page ==', nextPage);
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING, loadMore: false });

      setTimeout(() => {
        API.fetchPictures(this.props.searchQuery, this.state.page)
          .then(data => {
            if (data.totalHits === 0) {
              console.log('IDLE');

              this.setState({
                status: Status.IDLE,
                error: 'No found images!',
              });
              return;
            }
            const filterPictures = data.hits.map(
              ({ id, webformatURL, largeImageURL, tags }) => ({
                id,
                webformatURL,
                largeImageURL,
                tags,
              })
            );
            const newPictures = this.state.pictures.concat(filterPictures);
            let isLoadMore = true;
            if (newPictures.length === data.totalHits) {
              isLoadMore = false;
            }
            this.setState({
              pictures: newPictures,
              status: Status.RESOLVED,
              loadMore: isLoadMore,
            });
          })
          .catch(error => {
            this.setState({ error, status: Status.REJECTED });
          });
      }, 300);
    }
  }

  render() {
    const { status, pictures } = this.state;
    if (status === Status.IDLE) {
      return (
        <>
          {this.state.error && (
            <p style={{ textAlign: 'center' }}>{this.state.error}</p>
          )}
        </>
      );
      // return <p>No images</p>;
    }

    return (
      <>
        <ul className={css.ImageGallery}>
          {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <li className={css.ImageGalleryItem} key={id}>
                <ImageGalleryItem
                  smallPicture={webformatURL}
                  largePicture={largeImageURL}
                  tags={tags}
                />
              </li>
            );
          })}
        </ul>
        {this.state.loadMore && (
          <Button onClick={this.clickLoadMore}>LoadMore</Button>
        )}
        {this.state.status === Status.PENDING && <Loader />}
      </>
    );
    // }

    // if (status === Status.PENDING) {
    // console.log('LOADING...');
    // return (

    // );
    // }
  }
}
