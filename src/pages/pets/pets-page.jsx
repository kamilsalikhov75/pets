import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PetCard } from '../../components/pet-card/pet-card';
import { fetchPets } from '../../redux/slices/pets';
import { Loading } from '../loading/loading';
import './pets-page.css';

const filters = [
  {
    ru: 'Все животные',
    filter: 'all',
  },
  {
    ru: 'Кошки',
    filter: 'cat',
  },
  {
    ru: 'Собаки',
    filter: 'dog',
  },
];

function PetsPage({ isShelterMode = false }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState('all');
  const pets = useSelector((state) => state.pets);

  const shelterFiltredPets = isShelterMode
    ? pets.items.filter((pet) => {
        return pet.shelter._id === id;
      })
    : pets.items;

  const filtredPets =
    currentFilter === 'all'
      ? shelterFiltredPets
      : shelterFiltredPets.filter((pet) => pet.kind === currentFilter);
  useEffect(() => {
    dispatch(fetchPets());
  }, []);

  if (pets.status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="pets">
      <div className="container pets__container">
        <select
          className="pets__select"
          value={currentFilter}
          onChange={(e) => setCurrentFilter(e.target.value)}
        >
          {filters.map((filter) => (
            <option
              key={filter.filter}
              value={filter.filter}
              className="pets__option"
            >
              {filter.ru}
            </option>
          ))}
        </select>
        <div className="pets__block">
          {filtredPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} isDelitable={isShelterMode} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { PetsPage };
