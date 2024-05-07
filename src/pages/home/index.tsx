import CardMovie from '@components/cardMovie';
import useAxios from '@hooks/useAxios.ts';

import { MovieResume } from '@/types';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNav } from '@components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { response: trending } = useAxios('/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc');
  const { response: nowPlaying } = useAxios('/movie/now_playing?language=pt-BR&page=1&region=BR');
  const { response: genresResponse } = useAxios('/genre/movie/list?language=pt');

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!trending && !nowPlaying && !genresResponse) {
    return (
      <div className="absolute left-0 top-0 grid h-screen w-full place-items-center">
        <Loader2 className="animate-spin stroke-amber-50" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-auto flex-col gap-10 px-4 py-12">
      <div className="space-y-4">
        <h3 className="font-semibold text-white">Em cartaz</h3>

        <div>
          <div>
            <Carousel setApi={setApi} opts={{ loop: true, duration: 60 }} plugins={[Autoplay({ delay: 3000 })]}>
              <CarouselContent>
                {nowPlaying?.results.map((data: MovieResume, i: number) => (
                  <CarouselItem key={data.id} className="basis-1/2 lg:basis-1/5">
                    <CardMovie
                      className={`origin-center ${i === current ? 'scale-100 opacity-100' : `-rotate-3 scale-75 opacity-70`}`}
                      data={data}
                      genres={genresResponse?.genres}
                      hoover={false}
                      details="hide"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNav />
            </Carousel>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-white">Populares</h3>

        <div className="grid grid-cols-2 justify-items-center gap-12 lg:grid-cols-5">
          {trending?.results.map((data: MovieResume) => <CardMovie key={data.id} data={data} genres={genresResponse?.genres} hoover={true} details="show" />)}
        </div>
      </div>
    </div>
  );
}
