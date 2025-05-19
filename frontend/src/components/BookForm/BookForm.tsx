import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { addBook } from '../../store/bookSlice';
import Rating from '../Rating/Rating';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import './BookForm.css';

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $status: String!, $rating: Int, $notes: String) {
    createBook(title: $title, author: $author, status: $status, rating: $rating, notes: $notes) {
      id
      title
      author
      status
      rating
      notes
    }
  }
`;

const BookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('to_read');
  const [rating, setRating] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

   const [createBook] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await createBook({
        variables: {
          title,
          author,
          status,
          rating,
          notes
        }
      });

      if (data) {
        dispatch(addBook(data.createBook));
        toast.success(`📚 Libro "${title}" añadido con éxito!`);
        setTitle('');
        setAuthor('');
        setStatus('to_read');
        setRating(1);
        setNotes('');
      }
    } catch (err) {
      toast.error('❌ Hubo un error al crear el libro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="to_read">To Read</option>
        <option value="reading">Reading</option>
        <option value="finished">Finished</option>
      </select>

      <div className="rating-container">
        <label>Rating:</label>
        <Rating value={rating} onChange={setRating} />
      </div>

      <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
