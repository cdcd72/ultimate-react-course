import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { City } from '../models/city.model';

type CitiesContextType = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  error?: string;
  fetchCity: (id: number) => Promise<void>;
  createCity: (city: City) => Promise<void>;
  deleteCity: (id: number | undefined) => Promise<void>;
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
    id: 0,
  },
  error: undefined,
  fetchCity: async () => {},
  createCity: async () => {},
  deleteCity: async () => {},
});

type CityState = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  error?: string;
};

enum CityActionKind {
  loading = 'loading',
  citiesLoaded = 'cities/loaded',
  cityLoaded = 'city/loaded',
  cityCreated = 'city/created',
  cityDeleted = 'city/deleted',
  rejected = 'rejected',
}

type CityAction = {
  type: CityActionKind;
  payload?: any;
};

const initialState: CityState = {
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
    id: 0,
  },
};

function reducer(state: CityState, action: CityAction): CityState {
  switch (action.type) {
    case CityActionKind.loading:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case CityActionKind.citiesLoaded:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case CityActionKind.cityLoaded:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case CityActionKind.cityCreated:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case CityActionKind.cityDeleted:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: initialState.currentCity,
      };
    case CityActionKind.rejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: CityActionKind.loading });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const cities = await res.json();
        dispatch({ type: CityActionKind.citiesLoaded, payload: cities });
      } catch {
        dispatch({
          type: CityActionKind.rejected,
          payload: 'There was an error fetching cities!',
        });
      }
    }
    fetchCities();
  }, []);

  async function fetchCity(id: number) {
    dispatch({ type: CityActionKind.loading });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await res.json();
      dispatch({ type: CityActionKind.cityLoaded, payload: city });
    } catch {
      dispatch({
        type: CityActionKind.rejected,
        payload: 'There was an error fetching city!',
      });
    }
  }

  async function createCity(city: City) {
    dispatch({ type: CityActionKind.loading });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const addedCity = await res.json();
      dispatch({ type: CityActionKind.cityCreated, payload: addedCity });
    } catch {
      dispatch({
        type: CityActionKind.rejected,
        payload: 'There was an error creating city!',
      });
    }
  }

  async function deleteCity(id: number | undefined) {
    dispatch({ type: CityActionKind.loading });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: CityActionKind.cityDeleted, payload: id });
    } catch {
      dispatch({
        type: CityActionKind.rejected,
        payload: 'There was an error deleting city!',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
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
