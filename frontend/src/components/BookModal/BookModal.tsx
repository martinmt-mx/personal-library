import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { selectBook } from '../../store/bookSlice';
import './BookModal.css';

const BookModal: React.FC = () => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.books.selectedBook);

  if (!book) return null;

  const handleClose = () => {
    dispatch(selectBook(null));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Status:</strong> {book.status}</p>
        <p><strong>Rating:</strong> {book.rating} ⭐</p>
        <p><strong>Notes:</strong> {book.notes ? book.notes : "No notes available"}</p>

        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookModal;
