import './App.css';
import BookList from './components/BookList/BookList';
import BookForm from './components/BookForm/BookForm';

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
    </div>
  );
};

export default App;
