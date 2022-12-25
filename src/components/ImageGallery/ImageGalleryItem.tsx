import s from './ImageGallery.module.css';

interface ImageGalleryItemProps {
  image: string;
  index: number;
  getLargeImage: (index: number) => void;
  toggleModal: () => void;
}

const ImageGalleryItem = ({
  image,
  index,
  getLargeImage,
  toggleModal,
}: ImageGalleryItemProps) => {
  const onClickOpenModal = (e: React.MouseEvent<HTMLLIElement>) => {
    toggleModal();
    getLargeImage(index);
  };

  return (
    <li className={s.imageGalleryItem} onClick={onClickOpenModal}>
      <img src={image} alt="" className={s.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
