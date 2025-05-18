import { useQuery, gql } from '@apollo/client';
import BookColumn from '../BookColumn/BookColumn';
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
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toReadBooks = (data?.books ?? []).filter((book) => book.status === 'to_read');
  const readingBooks = (data?.books ?? []).filter((book) => book.status === 'reading');
  const finishedBooks = (data?.books ?? []).filter((book) => book.status === 'finished');

  return (
    <div className="book-list">
      <BookColumn title="To Read" books={toReadBooks} />
      <BookColumn title="Reading" books={readingBooks} />
      <BookColumn title="Finished" books={finishedBooks} />
    </div>
  );
};

export default BookList;
