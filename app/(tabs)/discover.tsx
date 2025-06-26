// app/(tabs)/discover.tsx
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DiscoverScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Discover</Text>
        <Text className="text-gray-600 text-center">
          Find new movies and music based on your taste
        </Text>
      </View>
    </SafeAreaView>
  );
}