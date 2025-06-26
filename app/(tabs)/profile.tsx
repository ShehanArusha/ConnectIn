// app/(tabs)/profile.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 pt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-8">Profile</Text>
        
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 rounded-lg py-4 px-6 flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-lg ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}