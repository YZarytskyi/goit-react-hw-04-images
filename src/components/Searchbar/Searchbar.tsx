import s from './Searchbar.module.css';

interface SearchbarProps {
  getImagesByKeyword: (query: string) => void;
}

const Searchbar = ({ getImagesByKeyword }: SearchbarProps) => {
  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    getImagesByKeyword(e.currentTarget.search.value);
  };
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
