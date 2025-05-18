import { useQuery, useMutation, gql } from '@apollo/client';
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

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const BookList: React.FC = () => {
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleDelete = (id: string) => {
    deleteBook({
      variables: {
        id,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="book-list">
      <h2>Lista de Libros</h2>
      <ul>
        {data && data.books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} [{book.status}]
            <button className="delete-button" onClick={() => handleDelete(book.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
