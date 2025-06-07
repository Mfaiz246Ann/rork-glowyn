import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, Search, Camera, ShoppingBag, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textAlt,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.backgroundAlt : colors.surface,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.backgroundAlt : colors.surface,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: 'Analyze',
          tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="style-feed"
        options={{
          title: 'Style Feed',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}