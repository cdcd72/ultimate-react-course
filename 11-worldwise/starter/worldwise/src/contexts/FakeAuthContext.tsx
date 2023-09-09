import { ReactNode, createContext, useContext, useReducer } from 'react';

import { User } from '../models/user.model';

type AuthContextType = {
  isAuthenticated: boolean;
  user?: User;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {},
});

type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

enum AuthActionKind {
  login = 'login',
  logout = 'logout',
}

type AuthAction = {
  type: AuthActionKind;
  payload?: any;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionKind.login:
      return { ...state, isAuthenticated: true, user: action.payload };
    case AuthActionKind.logout:
      return { ...state, isAuthenticated: false, user: undefined };
    default:
      throw new Error('Unknown action type');
  }
}

const FAKE_USER: User = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: AuthActionKind.login, payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: AuthActionKind.logout });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of the AuthProvider.');
  return context;
}

export { AuthProvider, useAuth };
