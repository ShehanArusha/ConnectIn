// store/useStore.ts
import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { Profile, MovieLog, MusicLog, Friendship } from '../lib/supabase';

interface AppState {
  // Auth
  session: Session | null;
  setSession: (session: Session | null) => void;
  
  // User Profile
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  
  // Activity Logs
  movieLogs: MovieLog[];
  setMovieLogs: (logs: MovieLog[]) => void;
  addMovieLog: (log: MovieLog) => void;
  
  musicLogs: MusicLog[];
  setMusicLogs: (logs: MusicLog[]) => void;
  addMusicLog: (log: MusicLog) => void;
  
  // Friends
  friends: Friendship[];
  setFriends: (friends: Friendship[]) => void;
  friendSuggestions: Profile[];
  setFriendSuggestions: (suggestions: Profile[]) => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  // Auth
  session: null,
  setSession: (session) => set({ session }),
  
  // User Profile
  profile: null,
  setProfile: (profile) => set({ profile }),
  
  // Activity Logs
  movieLogs: [],
  setMovieLogs: (logs) => set({ movieLogs: logs }),
  addMovieLog: (log) => set((state) => ({ 
    movieLogs: [log, ...state.movieLogs] 
  })),
  
  musicLogs: [],
  setMusicLogs: (logs) => set({ musicLogs: logs }),
  addMusicLog: (log) => set((state) => ({ 
    musicLogs: [log, ...state.musicLogs] 
  })),
  
  // Friends
  friends: [],
  setFriends: (friends) => set({ friends }),
  friendSuggestions: [],
  setFriendSuggestions: (suggestions) => set({ friendSuggestions: suggestions }),
  
  // UI State
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}));