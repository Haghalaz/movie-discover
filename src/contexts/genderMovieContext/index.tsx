import { Genre } from '@/types';

import { createContext, useContext } from 'react';
import useAxios from '@hooks/useAxios.ts';

const GlobalContext = createContext<{ genres: Genre[] }>({ genres: [] });

export const GenderMovieProvider = ({ children }: { children: JSX.Element }) => {
  const { response: genres } = useAxios('/genre/movie/list?language=pt-BR');

  return <GlobalContext.Provider value={{ genres: genres?.genres as Genre[] }}>{children}</GlobalContext.Provider>;
};

export const useGenderMovieContext = () => useContext(GlobalContext);
