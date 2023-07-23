import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsCard from './components/NewsCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsCard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
