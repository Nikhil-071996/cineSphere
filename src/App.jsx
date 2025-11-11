import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer/Footer'
import CastPage from './pages/CastPage'
import ListPage from './pages/ListPage'

function App() {

  return (
    <BrowserRouter>
        <ScrollToTop />
        <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/details/:category/:id'} element={<MovieDetails />} />
        <Route path="/list/:mediaType/:category" element={<ListPage />} />
        <Route path="/person/:id" element={<CastPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
