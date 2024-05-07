import { Cast } from '@/types';

import { Skeleton } from '@components/ui/skeleton.tsx';

export default function CardCast({ data }: { data: Cast }) {
  const { name, profile_path, character } = data;

  return (
    <div className="relative h-56 min-h-36 min-w-36 overflow-hidden rounded-md">
      <img
        className="absolute top-0 z-40 h-full w-full rounded-sm object-cover"
        src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : `https://ui-avatars.com/api/?name=${name}`}
        alt={`${name} Picture`}
      />

      <div className="absolute bottom-0 z-50 w-full truncate bg-slate-600/50 p-1 backdrop-blur">
        <p className="truncate font-bold">{name}</p>
        <small>{character}</small>
      </div>

      <Skeleton className="absolute top-0 z-0 h-full w-full" />
    </div>
  );
}
