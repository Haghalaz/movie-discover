import { AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai';
import { Genre, MovieResume } from '@/types';
import { Link } from 'react-router-dom';
import { Skeleton } from '@components/ui/skeleton.tsx';

type Props = { className?: string; data: MovieResume; genres: Genre[]; hoover: boolean; details: 'show' | 'hide' };

export default function CardMovie({ className, data, genres, hoover, details }: Props) {
  const { id, poster_path, title, vote_average, release_date, genre_ids } = data;
  const genresNames = genre_ids?.map((genre) => genres?.find((g) => g.id == genre)?.name);

  if (!data || !poster_path) return;

  return (
    <Link to={`/Movie?m=${id}`}>
      <div
        className={`animate-fade-in anima relative aspect-[22/33] cursor-pointer overflow-hidden rounded-md text-white transition-transform duration-500 ${className} ${hoover && 'opacity-70 hover:z-40 hover:scale-[1.05] hover:opacity-100'}`}
      >
        <img className="sticky z-30 rounded-md object-cover" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title} Poster`} />

        <img className="absolute top-0 z-10 scale-[1.02] opacity-20 blur-lg" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`${title} Poster`} />

        <Skeleton className="absolute top-0 z-0 size-full" />

        <div
          className={`absolute bottom-0 z-40 w-full space-y-2  bg-black/60 px-4 py-2 backdrop-blur transition-transform ${details === 'show' ? 'h-24' : 'opacity-0'}`}
        >
          <div>
            <p className="truncate font-semibold">{title}</p>

            <div className="flex flex-wrap gap-2">
              <small className="truncate text-xs opacity-70">{genresNames?.join(' / ')}</small>
            </div>
          </div>

          {details === 'show' && (
            <div className="flex gap-4 text-xs text-white">
              <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-2 py-1">
                <AiOutlineStar />
                <small>{vote_average?.toFixed(1)}</small>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/50 px-2 py-1">
                <AiOutlineCalendar />
                <small>{release_date?.split('-')[0]}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
