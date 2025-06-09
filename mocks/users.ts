import { UserProfile } from '@/types';

// Current logged-in user
export const currentUser: UserProfile = {
  id: 'user1',
  username: 'dita_elegance',
  displayName: 'Dita',
  bio: 'Fashion enthusiast | Style advisor | Color analyst',
  followers: 1250,
  following: 365,
  profileImage: 'https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg',
  location: 'Jakarta, Indonesia',
  website: 'stylewithme.id',
  joinDate: '2023-01-15',
  isPremium: true,
  analysisResults: [
    {
      id: 'analysis1',
      type: 'color',
      title: 'Color Analysis',
      date: '2023-05-10',
      result: 'Autumn',
      details: {
        primaryColors: ['#8B4513', '#DAA520', '#556B2F'],
        secondaryColors: ['#CD853F', '#A0522D', '#6B8E23'],
        avoidColors: ['#00BFFF', '#FF1493', '#7B68EE'],
      }
    },
    {
      id: 'analysis2',
      type: 'face',
      title: 'Face Shape Analysis',
      date: '2023-05-12',
      result: 'Oval',
      details: {
        faceLength: 'Medium',
        foreheadWidth: 'Medium',
        cheekboneWidth: 'Medium',
        jawlineShape: 'Rounded',
        chinShape: 'Slightly pointed',
      }
    },
    {
      id: 'analysis3',
      type: 'skin',
      title: 'Skin Analysis',
      date: '2023-06-01',
      result: 'Normal to Dry',
      details: {
        skinTone: 'Medium with warm undertones',
        concerns: ['Occasional dryness', 'Slight hyperpigmentation'],
        recommendations: ['Hydrating serums', 'Gentle exfoliation', 'SPF protection']
      }
    }
  ],
  savedItems: ['product1', 'product3', 'post2'],
  recentSearches: ['summer dresses', 'oval face hairstyles', 'warm color palette']
};

// Other popular users on the platform
export const popularUsers: UserProfile[] = [
  {
    id: 'user2',
    username: 'elegant_style',
    displayName: 'Elegant Style',
    bio: 'Elegance is the only beauty that never fades',
    followers: 15800,
    following: 420,
    profileImage: 'https://images.pexels.com/photos/32455529/pexels-photo-32455529/free-photo-of-charming-young-woman-with-bouquet-in-hanoi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Paris, France',
    isPremium: true,
    joinDate: '2022-03-10',
  },
  {
    id: 'user3',
    username: 'sweet_casual',
    displayName: 'Sweet Casual',
    bio: 'Casual style with a sweet touch',
    followers: 12400,
    following: 530,
    profileImage: 'https://images.pexels.com/photos/16270616/pexels-photo-16270616/free-photo-of-young-brunette-woman-posing-with-both-hands-by-her-face.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Seoul, South Korea',
    isPremium: true,
    joinDate: '2022-05-22',
  },
  {
    id: 'user4',
    username: 'cool_tomboy',
    displayName: 'Cool Tomboy',
    bio: 'Breaking fashion rules one outfit at a time',
    followers: 9800,
    following: 375,
    profileImage: 'https://images.pexels.com/photos/14795560/pexels-photo-14795560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'New York, USA',
    isPremium: false,
    joinDate: '2022-07-15',
  },
  {
    id: 'user5',
    username: 'cosplay_girl',
    displayName: 'Cosplay Girl',
    bio: 'Living in a world of fantasy and fashion',
    followers: 22500,
    following: 210,
    profileImage: 'https://images.pexels.com/photos/30475370/pexels-photo-30475370/free-photo-of-vibrant-cosplay-with-bamboo-hat-and-fan-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Tokyo, Japan',
    isPremium: true,
    joinDate: '2021-11-30',
  },
  {
    id: 'user6',
    username: 'hijabi_style',
    displayName: 'Hijabi Style',
    bio: 'Modest fashion | Hijab styling tips | Beauty',
    followers: 18700,
    following: 340,
    profileImage: 'https://images.pexels.com/photos/7123635/pexels-photo-7123635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Dubai, UAE',
    isPremium: true,
    joinDate: '2022-01-05',
  }
];