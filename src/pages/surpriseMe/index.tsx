import { Genre, MovieResume } from '@/types';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import CardMovie from '@components/cardMovie';
import { Switch } from '@components/ui/switch.tsx';
import { useGenderMovieContext } from '@/contexts/genderMovieContext';
import RandomizeMovies from '@/utils/RandomizeMovie';

export default function SurpriseMe() {
  const genderMovieContext = useGenderMovieContext();

  const [gender, setGender] = useState<string[]>([]);
  const { data: movies, isLoading } = RandomizeMovies(gender.join(','));

  const handleCheckboxChange = (value: string) => {
    if (gender.includes(value)) {
      setGender(gender.filter((item) => item !== value));
    } else {
      setGender([...gender, value]);
    }
  };

  return (
    <div className="container mx-auto flex h-full flex-col justify-between gap-10 py-8">
      <h2 className="font-semibold text-white">Me surpreenda</h2>
      <div className="grid place-items-center">
        <small className="mb-2 w-full text-white opacity-60">Obtenha recomendações de filmes baseado no genêro escolhido</small>
        <div className="grid grid-cols-6 gap-6 text-white">
          {genderMovieContext.genres?.map(({ id, name }: Genre) => (
            <div key={id} className="flex items-center gap-12 ">
              <Switch id={name} onCheckedChange={() => handleCheckboxChange(id.toString())} />
              <label htmlFor={name} className="text-md">
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-semibold text-white">Recomendações</h3>
      <div className="relative grid grid-cols-6 justify-items-center gap-5">
        {isLoading && (
          <div className="absolute left-0 top-0 col-span-full grid w-full place-items-center">
            <Loader2 className="animate-spin stroke-amber-50" />
          </div>
        )}

        {movies?.map((data: MovieResume) => <CardMovie key={data.id} data={data} genres={genderMovieContext?.genres} hoover={true} details="show" />)}
      </div>
    </div>
  );
}
