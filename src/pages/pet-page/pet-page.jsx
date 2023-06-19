import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../loading/loading';
import { customAxios } from '../../axios';
import './pet-page.css';
import { apiUrl } from '../../const';
import boyIcon from '/boy.svg';
import girlIcon from '/girl.svg';

const initialState = {
  data: {},
  status: 'loading',
};

function PetPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(initialState);

  const genderObj =
    pet.data.gender === 'male'
      ? { gender: 'МАЛЬЧИК', icon: boyIcon }
      : { gender: 'ДЕВОЧКА', icon: girlIcon };

  useEffect(() => {
    const promise = customAxios.get(`/pets/${id}`);
    promise
      .then((responce) => responce.data)
      .then((data) => setPet({ data, status: 'loaded' }))
      .catch((error) => {
        console.log(error);
        setPet({ ...pet, status: 'error' });
      });
  }, []);

  if (pet.status === 'loading') {
    return <Loading />;
  }
  console.log(pet.data.shelter);
  return (
    <div className="pet">
      <div className="container pet__container">
        <img src={`${apiUrl}${pet.data.image}`} className="pet__img" />
        <div className="pet__info">
          <h1 className="pet__title">{pet.data.name}</h1>
          <div className="pet__card-gender-block">
            <img src={genderObj.icon} className="pet__card-gender-image" />
            {genderObj.gender}
          </div>
          <p className="pet__text">{pet.data.shortDesc}</p>
          <p className="pet__text">{pet.data.desc}</p>
          <div className="pet__shelter">
            <h3 className="pet__subtitle">Информация о приюте:</h3>
            <ul className="pet__list">
              <li className="pet__list-item">
                Название: {pet.data.shelter.name}
              </li>
              <li className="pet__list-item">
                Адрес: {pet.data.shelter.address}
              </li>
              <li className="pet__list-item">
                Номер телефона: {pet.data.shelter.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PetPage };
