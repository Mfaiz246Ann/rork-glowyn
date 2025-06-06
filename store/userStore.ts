import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, AnalysisResult } from '@/types';
import { currentUser } from '@/mocks/users';
import { recentAnalysis } from '@/mocks/analysis';

interface UserState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  analysisResults: AnalysisResult[];
  setUser: (user: UserProfile | null) => void;
  login: () => void;
  logout: () => void;
  addAnalysisResult: (result: AnalysisResult) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: currentUser,
      isLoggedIn: true, // For demo purposes
      analysisResults: recentAnalysis,
      setUser: (user) => set({ user }),
      login: () => set({ isLoggedIn: true, user: currentUser }),
      logout: () => set({ isLoggedIn: false, user: null }),
      addAnalysisResult: (result) => 
        set((state) => ({ 
          analysisResults: [result, ...state.analysisResults] 
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);