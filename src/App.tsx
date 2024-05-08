import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { GenderMovieProvider } from '@/contexts/genderMovieContext';

import Header from '@components/header';

import Home from '@pages/home';
import MovieDetails from '@pages/movie';
import SurpriseMe from '@pages/surpriseMe';

function App() {
  return (
    <>
      <Router basename="/movie-discover/">
        <Header />

        <GenderMovieProvider>
          <Routes>
            <Route path="/" element={<Navigate to={'/Home'} />} />
            <Route path="*" element={<Navigate to={'/Home'} />} />

            <Route path="/Home" element={<Home />} />
            <Route path="/Movie" element={<MovieDetails />} />
            <Route path="/SurpriseMe" element={<SurpriseMe />} />
          </Routes>
        </GenderMovieProvider>
      </Router>
    </>
  );
}

export default App;
