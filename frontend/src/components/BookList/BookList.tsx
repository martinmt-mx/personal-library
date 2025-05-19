import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useLazyQuery } from "@apollo/client";
import BookColumn from "../BookColumn/BookColumn";
import { setBooks, addBooks } from "../../store/bookSlice";
import type { RootState } from "../../store";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import "./BookList.css";

const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int, $status: String) {
    books(limit: $limit, offset: $offset, status: $status) {
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
  const [offsets, setOffsets] = useState({
    to_read: 0,
    reading: 0,
    finished: 0,
  });
  const [loading, setLoading] = useState(false);

  const [loadToRead, { data: dataToRead, fetchMore: fetchMoreToRead }] =
    useLazyQuery(GET_BOOKS);
  const [loadReading, { data: dataReading, fetchMore: fetchMoreReading }] =
    useLazyQuery(GET_BOOKS);
  const [loadFinished, { data: dataFinished, fetchMore: fetchMoreFinished }] =
    useLazyQuery(GET_BOOKS);

  const books = useSelector((state: RootState) => state.books.books);

  const toReadBooks = books.filter((book) => book.status === "to_read");
  const readingBooks = books.filter((book) => book.status === "reading");
  const finishedBooks = books.filter((book) => book.status === "finished");

  useEffect(() => {
    const fetchInitialBooks = async () => {
      setLoading(true);

      await loadToRead({
        variables: { limit: 3, offset: 0, status: "to_read" },
      });
      await loadReading({
        variables: { limit: 3, offset: 0, status: "reading" },
      });
      await loadFinished({
        variables: { limit: 3, offset: 0, status: "finished" },
      });

      if (dataToRead?.books) dispatch(setBooks(dataToRead.books));
      if (dataReading?.books) dispatch(addBooks(dataReading.books));
      if (dataFinished?.books) dispatch(addBooks(dataFinished.books));

      setOffsets({
        to_read: 3,
        reading: 3,
        finished: 3,
      });

      setLoading(false);
    };
    fetchInitialBooks();
  }, [
    loadToRead,
    loadReading,
    loadFinished,
    dataToRead,
    dataReading,
    dataFinished,
    dispatch,
  ]);

  const loadMoreBooks = async () => {
    setLoading(true);

    const { data: moreToRead } = await fetchMoreToRead({
      variables: {
        limit: 3,
        offset: offsets.to_read,
        status: "to_read",
      },
    });

    const { data: moreReading } = await fetchMoreReading({
      variables: {
        limit: 3,
        offset: offsets.reading,
        status: "reading",
      },
    });

    const { data: moreFinished } = await fetchMoreFinished({
      variables: {
        limit: 3,
        offset: offsets.finished,
        status: "finished",
      },
    });

    if (moreToRead.books.length === 0) {
      toast.info("📚 No se encontraron más libros en 'To Read'");
    } else {
      dispatch(addBooks(moreToRead.books));
      setOffsets((prev) => ({ ...prev, to_read: prev.to_read + 3 }));
    }

    if (moreReading.books.length === 0) {
      toast.info("📚 No se encontraron más libros en 'Reading'");
    } else {
      dispatch(addBooks(moreReading.books));
      setOffsets((prev) => ({ ...prev, reading: prev.reading + 3 }));
    }

    if (moreFinished.books.length === 0) {
      toast.info("📚 No se encontraron más libros en 'Finished'");
    } else {
      dispatch(addBooks(moreFinished.books));
      setOffsets((prev) => ({ ...prev, finished: prev.finished + 3 }));
    }

    setLoading(false);
  };

  return (
    <>
      <div className="book-list">
        <BookColumn title="To Read" books={toReadBooks} />
        <BookColumn title="Reading" books={readingBooks} />
        <BookColumn title="Finished" books={finishedBooks} />
      </div>
      <div className="load-more">
        <button onClick={loadMoreBooks} disabled={loading}>
          {loading ? <Spinner /> : "Cargar más"}
        </button>
      </div>
    </>
  );
};

export default BookList;
