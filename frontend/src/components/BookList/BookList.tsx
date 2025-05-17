import { useQuery, gql } from '@apollo/client';

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

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {data && data.books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} [{book.status}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
