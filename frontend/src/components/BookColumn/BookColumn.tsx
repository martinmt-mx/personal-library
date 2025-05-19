import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { updateBook, deleteBook, selectBook } from "../../store/bookSlice";
import { toast } from "react-toastify";
import "./BookColumn.css";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number;
  notes?: string;
}

interface BookColumnProps {
  title: string;
  books: Book[];
  loadMore?: () => void;
  hasMore?: boolean;
}

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $status: String!) {
    updateBook(id: $id, status: $status) {
      id
      status
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const BookColumn: React.FC<BookColumnProps> = ({ title, books, loadMore, hasMore }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateBookMutation] = useMutation(UPDATE_BOOK);
  const [deleteBookMutation] = useMutation(DELETE_BOOK);

  const handleChangeStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      const { data } = await updateBookMutation({
        variables: {
          id,
          status,
        },
      });

      if (data) {
        const bookToUpdate = books.find((book) => book.id === id);
        if (bookToUpdate) {
          dispatch(updateBook({ ...bookToUpdate, status }));
          toast.success(`📚 Estado de "${bookToUpdate.title}" actualizado a ${status}`);
        }
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("❌ Hubo un error al actualizar el estado del libro.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id: string,
    title: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el libro "${title}"?`
    );
    if (confirmDelete) {
      setLoading(true);
      try {
        await deleteBookMutation({
          variables: {
            id,
          },
        });
        dispatch(deleteBook(id));
        toast.success(`🗑️ Libro "${title}" eliminado correctamente.`);
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        toast.error("❌ Hubo un error al eliminar el libro.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectBook = (e: React.MouseEvent, book: Book) => {
    if ((e.target as HTMLElement).tagName !== "SELECT") {
      dispatch(selectBook(book));
    }
  };

  return (
    <div className="book-column">
      <h2>{title}</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div
              className="book-info"
              onClick={(e) => handleSelectBook(e, book)}
              style={{ cursor: "pointer" }}
            >
              <span>
                {book.title} - {book.author}
              </span>
            </div>
            <div className="actions">
              <select
                value={book.status}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleChangeStatus(book.id, e.target.value)}
                disabled={loading}
              >
                <option value="to_read">To Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
              </select>
              <button
                className="delete-button"
                onClick={(e) => handleDelete(book.id, book.title, e)}
                disabled={loading}
              >
                {loading ? "⏳" : "❌"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {hasMore && loadMore && (
        <button
          className="load-more-button"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Cargar más"}
        </button>
      )}
    </div>
  );
};

export default BookColumn;
