import { MovieResume } from '@/types';

import { useCallback } from 'react';
import useAxios from '@hooks/useAxios.ts';

function getRandomItemsFromArray(arr: MovieResume[], count: number): MovieResume[] {
  const shuffled = arr.sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffled.slice(0, count); // Return the first 'count' elements
}

export default function RandomizeMovies(gender: string): MovieResume[] {
  const randomPage = Math.floor(Math.random() * 10) + 1;

  const { response } = useAxios(
    `/discover/movie?page=${randomPage}&include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${gender}`
  );

  const randomized = useCallback(() => {
    if (!response) return [];
    return getRandomItemsFromArray(response?.results, 6);
  }, [response]);

  return randomized();
}
