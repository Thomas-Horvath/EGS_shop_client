import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import PreHeader from './components/PreHeader/PreHeader';

function App() {
  return (
    <div className="app">
      <PreHeader />
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
