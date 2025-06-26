// app/(tabs)/home.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

export default function HomeScreen() {
  const { profile, movieLogs, musicLogs, setMovieLogs, setMusicLogs, setProfile } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }

      // Load movie logs (mock data for now)
      setMovieLogs([
        {
          id: '1',
          user_id: user.id,
          tmdb_id: 123,
          title: 'Inception',
          poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
          rating: 5,
          watched_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: user.id,
          tmdb_id: 456,
          title: 'The Dark Knight',
          poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
          rating: 5,
          watched_date: new Date(Date.now() - 86400000).toISOString(),
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);

      // Load music logs (mock data for now)
      setMusicLogs([
        {
          id: '1',
          user_id: user.id,
          spotify_id: 'abc123',
          track_name: 'Bohemian Rhapsody',
          artist_name: 'Queen',
          album_name: 'A Night at the Opera',
          listened_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: user.id,
          spotify_id: 'def456',
          track_name: 'Stairway to Heaven',
          artist_name: 'Led Zeppelin',
          album_name: 'Led Zeppelin IV',
          listened_date: new Date(Date.now() - 3600000).toISOString(),
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const ActivityCard = ({ type, data }: { type: 'movie' | 'music', data: any }) => {
    const isMovie = type === 'movie';
    const Icon = isMovie ? 'film' : 'musical-notes';
    const primaryText = isMovie ? data.title : data.track_name;
    const secondaryText = isMovie 
      ? `Rated ${data.rating}/5` 
      : `${data.artist_name} • ${data.album_name}`;
    const time = format(new Date(isMovie ? data.watched_date : data.listened_date), 'h:mm a');

    return (
      <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
        <View className="flex-row items-start">
          <View className={`w-12 h-12 rounded-full items-center justify-center ${
            isMovie ? 'bg-primary-100' : 'bg-secondary-100'
          }`}>
            <Ionicons 
              name={Icon as any} 
              size={24} 
              color={isMovie ? '#0ea5e9' : '#d946ef'} 
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="font-semibold text-gray-900">{primaryText}</Text>
            <Text className="text-gray-600 text-sm mt-1">{secondaryText}</Text>
            <Text className="text-gray-400 text-xs mt-2">{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-600">Welcome back,</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {profile?.full_name || 'Friend'}
              </Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1 bg-primary-500 rounded-xl p-4 items-center">
              <Ionicons name="add-circle-outline" size={28} color="white" />
              <Text className="text-white font-medium mt-2">Log Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-secondary-500 rounded-xl p-4 items-center">
              <Ionicons name="add-circle-outline" size={28} color="white" />
              <Text className="text-white font-medium mt-2">Log Music</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Friend Suggestions */}
        <View className="mb-6">
          <View className="px-6 mb-3">
            <Text className="text-lg font-semibold text-gray-900">People You Might Like</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity key={i} className="mr-4 items-center">
                <View className="w-20 h-20 bg-gray-200 rounded-full mb-2" />
                <Text className="text-sm font-medium text-gray-900">User {i}</Text>
                <Text className="text-xs text-gray-600">85% match</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View className="px-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Your Recent Activity</Text>
          
          {/* Combine and sort activities by date */}
          {(() => {
            const allActivities = [
              ...movieLogs.map(log => ({ type: 'movie' as const, data: log })),
              ...musicLogs.map(log => ({ type: 'music' as const, data: log })),
            ].sort((a, b) => {
              const dateA = new Date(a.type === 'movie' ? a.data.watched_date : a.data.listened_date);
              const dateB = new Date(b.type === 'movie' ? b.data.watched_date : b.data.listened_date);
              return dateB.getTime() - dateA.getTime();
            });

            return allActivities.map((activity, index) => (
              <ActivityCard 
                key={`${activity.type}-${activity.data.id}`} 
                type={activity.type} 
                data={activity.data} 
              />
            ));
          })()}
        </View>

        {/* Add padding at bottom */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}