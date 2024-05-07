import { Genre, MovieResume } from '@/types';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import CardMovie from '@components/cardMovie';
import { Switch } from '@components/ui/switch.tsx';
import { useGenderMovieContext } from '@/contexts/genderMovieContext';
import useAxios from '@hooks/useAxios.ts';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@components/ui/pagination.tsx';

export default function SurpriseMe() {
  const genderMovieContext = useGenderMovieContext();

  const [gender, setGender] = useState<string[]>(sessionStorage.getItem('gender')?.split(',') || []);
  const [page, setPage] = useState(1);

  const { response: movies, isLoading } = useAxios(
    `/discover/movie?include_adult=false&include_video=false&language=pt-BR&sort_by=popularity.desc&with_genres=${gender.join(',')}&page=${page}`
  );

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setPage(1);

    if (checked) {
      setGender((prev) => {
        const newValue = [...prev, value];
        sessionStorage.setItem('gender', newValue.join(','));
        return newValue;
      });
    } else {
      setGender((prev) => {
        const newValue = prev.filter((item) => item !== value);
        sessionStorage.setItem('gender', newValue.join(','));
        return newValue;
      });
    }
  };

  return (
    <div className="container mx-auto flex h-full flex-col justify-between gap-10 py-8">
      <div>
        <h2 className="font-semibold text-white">Me surpreenda</h2>
        <small className="mb-2 w-full text-white opacity-60">Obtenha recomendações de filmes baseado no genêro escolhido</small>
      </div>

      <div className="flex grid-cols-10 flex-col gap-12 lg:grid">
        <div className="col-span-2 space-y-4">
          <h3 className="font-semibold text-white">Estilos</h3>
          <div className=" grid grid-cols-2 items-center justify-center gap-6 text-white lg:grid-cols-1">
            {genderMovieContext.genres?.map(({ id, name }: Genre) => (
              <div
                key={id}
                className={`flex items-center gap-6 rounded-md border  p-4 transition-all ${gender.includes(id.toString()) ? 'border-green-500' : 'border-white/10'}`}
              >
                <Switch id={name} checked={gender.includes(id.toString())} onCheckedChange={(checked) => handleCheckboxChange(id.toString(), checked)} />
                <label htmlFor={name} className="text-sm">
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-8 space-y-4">
          <h3 className="font-semibold text-white">Recomendações</h3>

          <Pagination>
            <PaginationContent>
              <PaginationItem onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}>
                <PaginationPrevious />
              </PaginationItem>

              <PaginationItem>
                {page} de {movies?.total_pages || '...'} resultados
              </PaginationItem>

              <PaginationItem onClick={() => setPage((prev) => (prev < movies?.total_pages ? prev + 1 : prev))}>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="relative grid grid-cols-1 justify-items-center gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {isLoading && (
              <div className="absolute left-0 top-0 col-span-full grid w-full place-items-center">
                <Loader2 className="animate-spin stroke-amber-50" />
              </div>
            )}

            {movies?.results?.map((data: MovieResume) => (
              <CardMovie key={data.id} data={data} genres={genderMovieContext?.genres} hoover={true} details="show" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
