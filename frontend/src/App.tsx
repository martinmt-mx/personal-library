import './App.css';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import BookModal from './components/BookModal/BookModal';

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
    </div>
  );
};

export default App;
