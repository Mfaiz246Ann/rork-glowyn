import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AnalysisResult } from '@/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  analysisResults: AnalysisResult[];
  setUser: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addAnalysisResult: (result: AnalysisResult) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: "user1",
        name: "Anisa Wijaya",
        email: "anisa@example.com",
        avatar: "https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg",
        profileImage: "https://images.pexels.com/photos/7958942/pexels-photo-7958942.jpeg",
        displayName: "Dita",
        bio: "Beauty enthusiast & style lover",
        followers: 1250,
        following: 890,
        posts: 42,
      },
      isAuthenticated: true,
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
      ],
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, analysisResults: [] }),
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
      addAnalysisResult: (result) => {
        set((state) => ({
          analysisResults: [...(state.analysisResults || []), result]
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);