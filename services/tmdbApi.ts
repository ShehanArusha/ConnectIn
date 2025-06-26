// services/tmdbApi.ts
import { TMDB_API_KEY, TMDB_BASE_URL } from '@env';

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBSearchResult {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

class TMDBApi {
  private apiKey = TMDB_API_KEY;
  private baseUrl = TMDB_BASE_URL;

  private async fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryParams = new URLSearchParams({
      api_key: this.apiKey,
      ...params,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  }

  async searchMovies(query: string, page = 1): Promise<TMDBSearchResult> {
    return this.fetchApi<TMDBSearchResult>('/search/movie', {
      query,
      page: page.toString(),
    });
  }

  async getPopularMovies(page = 1): Promise<TMDBSearchResult> {
    return this.fetchApi<TMDBSearchResult>('/movie/popular', {
      page: page.toString(),
    });
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBSearchResult> {
    return this.fetchApi<TMDBSearchResult>(`/trending/movie/${timeWindow}`);
  }

  async getMovieDetails(movieId: number): Promise<TMDBMovie & {
    genres: Array<{ id: number; name: string }>;
    runtime: number;
  }> {
    return this.fetchApi(`/movie/${movieId}`);
  }

  getImageUrl(path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const tmdbApi = new TMDBApi();