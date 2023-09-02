import styles from './CountryList.module.css';

import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';

function GetCountries(cities: City[]) {
  let countries: Country[] = [];
  cities.forEach((city: City) => {
    if (!countries.map((country) => country.country).includes(city.country))
      countries = [
        ...countries,
        { country: city.country, emoji: city.emoji, id: Math.random() },
      ];
  });
  return countries;
}

function CountryList({
  cities,
  isLoading,
}: {
  cities: City[];
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries: Country[] = GetCountries(cities);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
