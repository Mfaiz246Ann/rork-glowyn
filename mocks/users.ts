import { UserProfile } from '@/types';

export const currentUser: UserProfile = {
  id: 'user1',
  username: 'dita_anggraini',
  displayName: 'Dita Anggraini',
  bio: 'Pecinta fashion & kecantikan 💄✨ Jakarta, Indonesia 🇮🇩',
  location: 'Jakarta, Indonesia',
  profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  followers: 846,
  following: 267,
  posts: 24,
};

export const popularUsers: UserProfile[] = [
  {
    id: 'user2',
    username: 'sarah_style',
    displayName: 'Sarah Style',
    bio: 'Fashion blogger | Tips gaya | Jakarta',
    location: 'Jakarta, Indonesia',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    followers: 12500,
    following: 350,
    posts: 187,
  },
  {
    id: 'user3',
    username: 'beauty_guru',
    displayName: 'Beauty Guru',
    bio: 'Makeup artist | Pecinta skincare',
    location: 'Singapura',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    followers: 28900,
    following: 412,
    posts: 342,
  },
  {
    id: 'user4',
    username: 'fashionista',
    displayName: 'Fashionista',
    bio: 'Fashion adalah passionku | Trendsetter',
    location: 'Kuala Lumpur, Malaysia',
    profileImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    followers: 15700,
    following: 523,
    posts: 211,
  },
];