import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { PetCreating } from './pages/pet-creating/pet-creating';
import { PetPage } from './pages/pet-page/pet-page';
import { PetsPage } from './pages/pets/pets-page';
import { Registration } from './pages/registration/registration';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/index.html" element={<Home />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route
          path="/shelter-pets/:id"
          element={<PetsPage isShelterMode={true} />}
        />
        <Route path="/pets/:id" element={<PetPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets/add" element={<PetCreating />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
