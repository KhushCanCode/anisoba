import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Stream from './components/Stream';
import Search from './components/Search';
import Home from './components/Home';
import Anime from './components/Anime';
import Categories from './components/Categories';
import Genres from './components/Genres';


function App() {
  

  return (
    <>
       <Router>
    <Header/>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/stream/:episodeId" element={<Stream/>}/>
        <Route path="/anime/:id" element={<Anime/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/genres/:genreId" element={<Genres/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
