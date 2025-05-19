import { useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { updateBook, deleteBook } from '../../store/bookSlice';
import './BookColumn.css';

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

const BookColumn: React.FC<BookColumnProps> = ({ title, books }) => {
    const dispatch = useDispatch();
    const [updateBookMutation] = useMutation(UPDATE_BOOK);
    const [deleteBookMutation] = useMutation(DELETE_BOOK);

    const handleChangeStatus = async (id: string, status: string) => {
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
                }
            }
        } catch (error) {
        console.error("Error al actualizar el estado:", error);
    }
    };

    const handleDelete = async (id: string, title: string) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el libro "${title}"?`);
        if (confirmDelete) {
            try {
                await deleteBookMutation({
                    variables: {
                        id,
                    },
                });
                dispatch(deleteBook(id));
            } catch (error) {
                console.error("Error al eliminar el libro:", error);
            }
        }
    };

    return (
        <div className="book-column">
            <h2>{title}</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="book-info">
                            <span>{book.title} - {book.author}</span>
                            <div className="actions">
                                <select
                                    value={book.status}
                                    onChange={(e) => handleChangeStatus(book.id, e.target.value)}
                                    >
                                    <option value="to_read">To Read</option>
                                    <option value="reading">Reading</option>
                                    <option value="finished">Finished</option>
                                </select>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(book.id, book.title)}
                                    >
                                    ❌
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookColumn;
