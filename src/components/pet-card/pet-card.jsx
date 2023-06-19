import { Link } from 'react-router-dom';
import boyIcon from '/boy.svg';
import girlIcon from '/girl.svg';
import './pet-card.css';
import { apiUrl } from '../../const';
import { useDispatch } from 'react-redux';
import { fetchDeletePet } from '../../redux/slices/pets';

function PetCard({ pet, isDelitable = false }) {
  const dispatch = useDispatch();
  const genderObj =
    pet.gender === 'male'
      ? { gender: 'МАЛЬЧИК', icon: boyIcon }
      : { gender: 'ДЕВОЧКА', icon: girlIcon };

  function deletePetCard() {
    dispatch(fetchDeletePet(pet._id));
  }

  return (
    <div className="pet__card">
      <img src={`${apiUrl}${pet.image}`} className="pet__card-image" />
      <div className="pet__card-info">
        <div className="pet__card-block">
          <h4 className="pet__card-title">{pet.name}</h4>
          <div className="pet__card-gender-block">
            <img src={genderObj.icon} className="pet__card-gender-image" />
            {genderObj.gender}
          </div>
        </div>
        <p className="pet__card-text">{pet.shortDesc}</p>
      </div>
      <div className="ped__card-links">
        <Link
          to={`/pets/${pet._id}`}
          className="pet__card-link pet__card-link--left"
        >
          Подробнее
        </Link>
        {isDelitable ? (
          <button
            onClick={deletePetCard}
            className="pet__card-button pet__card-button--right"
          >
            Удалить
          </button>
        ) : (
          <a
            href={`tel:+${pet.shelter.phone}`}
            className="pet__card-link pet__card-link--right"
          >
            Позвонить
          </a>
        )}
      </div>
    </div>
  );
}

export { PetCard };
