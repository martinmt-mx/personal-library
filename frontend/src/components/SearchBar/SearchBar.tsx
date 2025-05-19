import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectBook, deleteBook } from "../../store/bookSlice";
import "./SearchBar.css";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      id
      title
      author
      status
      rating
      notes
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const [searchBooks, { data }] = useLazyQuery(SEARCH_BOOKS);
  const [deleteBookMutation] = useMutation(DELETE_BOOK);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      await searchBooks({
        variables: {
          query,
        },
      });

      if (data?.searchBooks) {
        setResults(data.searchBooks);
      }
    } else {
      setResults([]);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar el libro "${title}"?`
    );
    if (confirmDelete) {
      try {
        await deleteBookMutation({
          variables: {
            id,
          },
        });

        setResults(results.filter((book: any) => book.id !== id));
        dispatch(deleteBook(id));
        toast.success(`🗑️ Libro "${title}" eliminado correctamente.`);
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        toast.error("❌ Hubo un error al eliminar el libro.");
      }
    }
  };

  const handleSelectBook = (book: any) => {
    dispatch(selectBook(book));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((book: any) => (
            <div key={book.id} className="search-item">
              <span
                onClick={() => handleSelectBook(book)}
                className="book-title"
              >
                {book.title} - {book.author}
              </span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(book.id, book.title);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
