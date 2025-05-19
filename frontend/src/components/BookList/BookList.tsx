import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import BookColumn from '../BookColumn/BookColumn';
import { setBooks } from '../../store/bookSlice';
import type { RootState } from '../../store';
import './BookList.css';

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number;
  notes?: string;
}

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      status
      rating
      notes
    }
  }
`;

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    if (data) {
      dispatch(setBooks(data.books));
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toReadBooks = books.filter((book) => book.status === 'to_read');
  const readingBooks = books.filter((book) => book.status === 'reading');
  const finishedBooks = books.filter((book) => book.status === 'finished');

  return (
    <div className="book-list">
      <BookColumn title="To Read" books={toReadBooks} />
      <BookColumn title="Reading" books={readingBooks} />
      <BookColumn title="Finished" books={finishedBooks} />
    </div>
  );
};

export default BookList;
