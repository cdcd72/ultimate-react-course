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
  createCity: (city: City) => Promise<void>;
  deleteCity: (id: string | undefined) => Promise<void>;
};

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext<CitiesContextType>({
  isLoading: false,
  cities: [],
  currentCity: {
    cityName: '',
    country: '',
    emoji: '',
    date: new Date(),
    notes: '',
    position: {
      lat: 0,
      lng: 0,
    },
    id: '',
  },
  fetchCity: async () => {},
  createCity: async () => {},
  deleteCity: async () => {},
});

function CitiesProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [currentCity, setCurrentCity] = useState<City>({
    cityName: '',
    country: '',
    emoji: '',
    date: new Date(),
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

  async function createCity(city: City) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const addedCity = await res.json();
      setCities((cities) => [...cities, addedCity]);
    } catch {
      alert('There was an error creating city!');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string | undefined) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert('There was an error deleting city!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
      }}
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
