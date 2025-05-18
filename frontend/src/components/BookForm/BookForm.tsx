import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
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
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');
  
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createBook({
      variables: {
        title,
        author,
        status,
        rating,
        notes
      }
    });

    setTitle('');
    setAuthor('');
    setStatus('to_read');
    setRating(undefined);
    setNotes('');
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
      <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit" disabled={loading}>Add Book</button>

      {error && <p>Error: {error.message}</p>}
      {data && <p>Book added successfully!</p>}
    </form>
  );
};

export default BookForm;
