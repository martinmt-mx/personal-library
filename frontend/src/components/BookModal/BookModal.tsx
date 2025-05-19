import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import type { RootState } from "../../store";
import { selectBook, updateBook } from "../../store/bookSlice";
import "./BookModal.css";

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $author: String!
    $status: String!
    $rating: Int
    $notes: String
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      status: $status
      rating: $rating
      notes: $notes
    ) {
      id
      title
      author
      status
      rating
      notes
    }
  }
`;

const BookModal: React.FC = () => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.books.selectedBook);
  const [updateBookMutation] = useMutation(UPDATE_BOOK);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("to_read");
  const [rating, setRating] = useState<number>(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setStatus(book.status);
      setRating(book.rating);
      setNotes(book.notes ?? "");
    }
  }, [book]);

  if (!book) return null;

  const handleClose = () => {
    dispatch(selectBook(null));
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const { data } = await updateBookMutation({
        variables: {
          id: book.id,
          title,
          author,
          status,
          rating,
          notes,
        },
      });

      if (data) {
        dispatch(updateBook(data.updateBook));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="to_read">To Read</option>
              <option value="reading">Reading</option>
              <option value="finished">Finished</option>
            </select>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Rating"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
            />
            <button onClick={handleSave} className="save-button">
              💾 Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Status:</strong> {book.status}
            </p>
            <p>
              <strong>Rating:</strong> {book.rating} ⭐
            </p>
            <p>
              <strong>Notes:</strong>{" "}
              {book.notes ? book.notes : "No notes available"}
            </p>
            <button onClick={() => setIsEditing(true)} className="edit-button">
              ✏️ Edit
            </button>
          </>
        )}

        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookModal;
