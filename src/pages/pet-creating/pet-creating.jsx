import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { customAxios } from '../../axios';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { CustomSelect } from '../../components/custom-select/custom-select';
import { CustomTextarea } from '../../components/custom-textarea/custom-textarea';
import { Loading } from '../loading/loading';
import './pet-creating.css';

function PetCreating() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.data);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [kind, setKind] = useState('cat');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [gender, setGender] = useState('male');
  const [isImageLoading, setIsImageLoading] = useState(false);

  if (!user) {
    return <Navigate to="/index.html" />;
  }

  async function handleChangeFile(event) {
    try {
      setIsImageLoading(true);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await customAxios.post('/uploads', formData);
      setImage(data.url);
      setIsImageLoading(false);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const fields = {
        name,
        kind,
        shortDesc,
        desc,
        image,
        gender,
        shelter: user.userData._id,
      };

      const { data } = await customAxios.post('/pets', fields);

      const _id = data._id;
      navigate(`/pets/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи');
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="editor">
      <div className="container">
        <div className="form__block">
          <form
            onSubmit={isImageLoading ? null : handleSubmit}
            className="form"
          >
            <CustomInput value={name} setValue={setName} placeholder="Кличка" />
            <CustomSelect
              value={kind}
              setValue={setKind}
              options={[
                { ru: 'Кот', value: 'cat' },
                { ru: 'Собака', value: 'dog' },
              ]}
            />
            <CustomSelect
              value={gender}
              setValue={setGender}
              options={[
                { ru: 'Мальчик', value: 'male' },
                { ru: 'Девочка', value: 'female' },
              ]}
            />
            <CustomInput
              value={shortDesc}
              setValue={setShortDesc}
              placeholder="Краткое описание"
            />
            <CustomTextarea
              value={desc}
              setValue={setDesc}
              placeholder="Описание"
            />
            <input
              className="input"
              onChange={(e) => handleChangeFile(e)}
              type="file"
            />
            <CustomButton
              text={isImageLoading ? 'Загрузка изображения' : 'Добавить'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export { PetCreating };
