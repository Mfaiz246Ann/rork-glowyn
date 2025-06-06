import { FeedPost, Comment } from '@/types';

export const feedPosts: FeedPost[] = [
  {
    id: 'post1',
    userId: 'user2',
    username: 'sarah_style',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    caption: 'Vibes musim semi dengan blouse favoritku! 🌸 #StyleMusimSemi #Fashion',
    likes: 243,
    comments: 18,
    tags: ['StyleMusimSemi', 'Fashion'],
    timestamp: '2025-05-30T14:32:00Z',
  },
  {
    id: 'post2',
    userId: 'user3',
    username: 'beauty_guru',
    userImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    caption: 'Menemukan shade blush yang sempurna untuk tone kulitku! 💕 #TipsKecantikan #MakeupLover',
    likes: 456,
    comments: 32,
    tags: ['TipsKecantikan', 'MakeupLover'],
    timestamp: '2025-05-29T09:15:00Z',
  },
  {
    id: 'post3',
    userId: 'user4',
    username: 'fashionista',
    userImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    caption: 'Hari santai di rumah dengan hoodie favoritku ☕ #StyleNyaman #OOTD',
    likes: 312,
    comments: 24,
    tags: ['StyleNyaman', 'OOTD'],
    timestamp: '2025-05-28T16:45:00Z',
  },
];

export const comments: Record<string, Comment[]> = {
  post1: [
    {
      id: 'comment1',
      userId: 'user3',
      username: 'beauty_guru',
      userImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      text: 'Suka banget warna ini di kamu! 😍',
      timestamp: '2025-05-30T15:10:00Z',
    },
    {
      id: 'comment2',
      userId: 'user4',
      username: 'fashionista',
      userImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      text: 'Beli dimana ini? Aku butuh di lemari pakaianku!',
      timestamp: '2025-05-30T16:22:00Z',
    },
  ],
};