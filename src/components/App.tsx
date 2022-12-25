import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { pixabayApi } from '../api/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { Image } from './types/types';
import s from './App.module.css';

const App = () => {
  const [images, setImages] = useState<Array<Image>>([]);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [largeImage, setLargeImage] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    if (!keyword) {
      return;
    }
    fetchImages();
  // eslint-disable-next-line
  }, [page, keyword]);

  const fetchImages = () => {
    pixabayApi
      .fetchImages(keyword, page)
      .then(({ data }) => {
        if (!data.hits.length) {
          Notify.failure('Images not found');
          clearStateImages();
          return;
        }
        setImages(prev => [...prev, ...data.hits]);
        setTotalImages(data.total);
      })
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  };

  const getImagesByKeyword = (query: string) => {
    query = query?.trim().toLowerCase();
    if (!query) {
      Notify.failure('Please enter something');
      clearStateImages();
      return;
    }
    if (query === keyword) {
      return;
    }
    clearStateImages();
    setLoading(true);
    setPage(1);
    setKeyword(query);
  };

  const loadMoreImages = () => {
    setLoading(true);
    setPage(prev => prev + 1);
  };

  const clearStateImages = () => {
    setImages([]);
    setTotalImages(0);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const getLargeImage = (index: number) => {
    setLargeImage(images[index].largeImageURL);
  };

  const hasMoreImages = totalImages > page * 12;

  return (
    <div className={s.app}>
      <Searchbar getImagesByKeyword={getImagesByKeyword} />
      <ImageGallery
        images={images}
        loading={loading}
        getLargeImage={getLargeImage}
        toggleModal={toggleModal}
      />
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {hasMoreImages && <Button loadMoreImages={loadMoreImages} />}
    </div>
  );
};

export default App;
