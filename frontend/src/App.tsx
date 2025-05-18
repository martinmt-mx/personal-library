import './App.css';
import BookList from './components/BookList/BookList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>📚 Personal Library</h1>
      </header>

      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;
