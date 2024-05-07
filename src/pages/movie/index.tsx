import { useSearchParams } from 'react-router-dom';

import useAxios from '@hooks/useAxios.ts';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai';
import { Cast, Movie, MovieProvider } from '@/types';
import CardCast from '@components/cardCast';
import { Skeleton } from '@components/ui/skeleton.tsx';

export default function MovieDetails() {
  const [searchParams] = useSearchParams();
  const MOVIE_ID = searchParams.get('m');

  const { response: movie }: { response: Movie } = useAxios(`/movie/${MOVIE_ID}?language=pt-BR`);
  const { response: whereToWatch } = useAxios(`/movie/${MOVIE_ID}/watch/providers?language=pt-BR`);
  const { response: cast } = useAxios(`/movie/${MOVIE_ID}/credits?language=pt-BR`);

  return (
    <>
      <div className="static w-full text-white">
        <div className="relative flex h-[16rem] w-full md:h-[32rem]">
          {!!movie?.backdrop_path && (
            <>
              <img
                className="absolute top-0 z-10 h-full w-full bg-none object-cover object-center"
                src={`https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`}
                alt="Movie Poster"
              />
              <span className="absolute top-0 z-20 h-full w-full bg-gradient-to-t from-[#15161C]" />
              <Skeleton className="absolute top-0 z-0 h-full w-full" />
            </>
          )}
        </div>

        <div className="relative z-50 -translate-y-24 space-y-8 px-4 md:px-[24rem]">
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold">{movie?.title}</h4>
              <p className="font-light opacity-50">{movie?.tagline}</p>
            </div>

            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <AiOutlineClockCircle />
                <p>{movie?.runtime} min</p>
              </div>

              <div className="flex items-center gap-2">
                <AiOutlineStar />
                <p>{movie?.vote_average.toFixed(1)}</p>
              </div>

              <div className="flex items-center gap-2">
                <AiOutlineCalendar />
                <p>{movie?.release_date.split('-')[0]}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {movie?.genres.map((item, index) => (
                <small key={index} className="rounded-lg border border-green-600 bg-green-900 px-2 py-1">
                  {item.name}
                </small>
              ))}
            </div>
          </div>

          <div>
            <p className="font-light opacity-95">{movie?.overview}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="font-semibold">Produtoras: </p>
            {movie?.production_companies.map((item, index) => (
              <small key={index} className="rounded-lg border border-zinc-600 bg-zinc-900 px-2 py-1">
                {item.name}
              </small>
            ))}
          </div>

          <div className="space-y-4">
            <p className="font-semibold">Elenco:</p>

            <div className="flex gap-4 overflow-hidden overflow-x-auto py-2">{cast?.cast.map((cast: Cast) => <CardCast key={cast.id} data={cast} />)}</div>
          </div>

          {!!whereToWatch?.results?.BR?.flatrate && (
            <div className="space-y-4">
              <p className="font-semibold">Onde assistir:</p>

              {whereToWatch.results.BR.flatrate.map((provider: MovieProvider) => (
                <div key={provider.provider_id} className="flex items-center gap-2">
                  <img className="aspect-square w-8 rounded-md" src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`} alt="" />
                  <small>{provider.provider_name}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
