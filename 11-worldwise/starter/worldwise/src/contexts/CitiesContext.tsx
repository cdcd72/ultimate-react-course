import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { City } from '../models/city.model';

type CitiesContextType = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  fetchCity: (id: string) => Promise<void>;
};

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext<CitiesContextType>({
  isLoading: false,
  cities: [],
  currentCity: {
    cityName: '',
    country: '',
    emoji: '',
    date: '',
    notes: '',
    position: {
      lat: 0,
      lng: 0,
    },
    id: '',
  },
  fetchCity: async () => {},
});

function CitiesProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City>({
    cityName: '',
    country: '',
    emoji: '',
    date: '',
    notes: '',
    position: {
      lat: 0,
      lng: 0,
    },
    id: '',
  });

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error fetching cities!');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function fetchCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert('There was an error fetching cities!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ isLoading, cities, currentCity, fetchCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside of the CitiesProvider.');
  return context;
}

export { CitiesProvider, useCities };
