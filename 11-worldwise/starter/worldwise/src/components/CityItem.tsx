import styles from './CityItem.module.css';

import { Link } from 'react-router-dom';

import { City } from '../models/city.model';

import { useCities } from '../contexts/CitiesContext';

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }: { city: City }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  async function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
