// app/_layout.tsx
import './global.css';  // Changed from '../global.css' to './global.css'
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';

export default function RootLayout() {
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}