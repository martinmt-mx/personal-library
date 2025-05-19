import './App.css';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import BookModal from './components/BookModal/BookModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  return (
    <div className="App">
      <header>
        <h1>📚 Personal Library</h1>
      </header>

      <main>
        <BookForm />
        <BookList />
      </main>

      <BookModal />
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} />
    </div>
  );
};

export default App;
