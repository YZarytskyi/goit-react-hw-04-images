import s from './Button.module.css';

interface ButtonProps {
  loadMoreImages: () => void;
}

const Button = ({ loadMoreImages }: ButtonProps) => {
  const onClickLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loadMoreImages();
  };
  return (
    <button className={s.button} onClick={onClickLoadMore}>
      Load more
    </button>
  );
};

export default Button;
