// lib/supabase.ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Temporary values - replace with your actual Supabase credentials
const SUPABASE_URL = 'https://tniifvyippxkicojndyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaWlmdnlpcHB4a2ljb2puZHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MTIzMTYsImV4cCI6MjA2NjQ4ODMxNn0.3YEOVNgzdQIas_nERBizHqgMPusIIpuZJy-V8Kz8OAc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Export types
export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface MovieLog {
  id: string;
  user_id: string;
  tmdb_id: number;
  title: string;
  poster_path?: string;
  rating?: number;
  watched_date: string;
  created_at: string;
}

export interface MusicLog {
  id: string;
  user_id: string;
  spotify_id: string;
  track_name: string;
  artist_name: string;
  album_name?: string;
  album_art?: string;
  listened_date: string;
  created_at: string;
}

export interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}