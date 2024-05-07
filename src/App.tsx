import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Header from '@components/header';

import Home from '@pages/home';
import MovieDetails from '@pages/movie';
import SurpriseMe from '@pages/surpriseMe';
import { GenderMovieProvider } from '@/contexts/genderMovieContext';

function App() {
  return (
    <>
      <Header />

      <GenderMovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={'/Home'} />} />
            <Route path="*" element={<Navigate to={'/Home'} />} />

            <Route path="/Home" element={<Home />} />
            <Route path="/Movie" element={<MovieDetails />} />
            <Route path="/SurpriseMe" element={<SurpriseMe />} />
          </Routes>
        </Router>
      </GenderMovieProvider>
    </>
  );
}

export default App;
