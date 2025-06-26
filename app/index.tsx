// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useStore } from '../store/useStore';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const session = useStore((state) => state.session);

  useEffect(() => {
    // Redirect based on auth status
    if (session) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/login');
    }
  }, [session]);

  // Show loading while checking auth
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0ea5e9" />
    </View>
  );
}