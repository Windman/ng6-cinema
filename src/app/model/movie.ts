export type GenreType = 'action' | 'adventure' | 'biography' | 'comedy' | 'crime'
  | 'drama' | 'history' | 'mystery' | 'scifi' | 'sport' | 'thriller';

export const GENRE_TYPE = {
  action: 'action' as GenreType,
  adventure: 'adventure' as GenreType,
  biography: 'biography' as GenreType,
  comedy: 'comedy' as GenreType,
  crime: 'crime' as GenreType,
  drama: 'drama' as GenreType,
  history: 'history' as GenreType,
  mystery: 'mystery' as GenreType,
  scifi: 'scifi' as GenreType,
  sport: 'sport' as GenreType,
  thriller: 'thriller' as GenreType
};

export class Movie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: string[];
  rate: number;
  length: string;
  img: string;

  constructor(options: {
    id?: number,
    key?: string,
    name?: string,
    description?: string,
    genres?: string[],
    rate?: number,
    length?: string,
    img?: string
  } = {}) {
    this.id = options.id || -1;
    this.key = options.key || 'default';
    this.name = options.name || 'default';
    this.description = options.description || '';
    this.genres = options.genres || [];
    this.rate = options.rate || -1;
    this.length = options.length || '';
    this.img = options.img || '';
  }
}
