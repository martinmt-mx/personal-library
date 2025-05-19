import './App.css';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import BookModal from './components/BookModal/BookModal';
import SearchBar from './components/SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>📚 Personal Library</h1>
      </header>

      <main>
        <SearchBar />
        <BookForm />
        <BookList />
      </main>

      <BookModal />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default App;
