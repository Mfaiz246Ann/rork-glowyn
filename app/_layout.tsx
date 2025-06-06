import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Create a client for React Query
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.text,
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: colors.background,
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="color-analysis" 
              options={{ 
                title: "Color Analysis",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="face-shape" 
              options={{ 
                title: "Face Shape Analysis",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="skin-analysis" 
              options={{ 
                title: "Skin Analysis",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="virtual-try-on" 
              options={{ 
                title: "Virtual Try-On",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="product/[id]" 
              options={{ 
                title: "Product Details",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="collection/[id]" 
              options={{ 
                title: "Collection",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="category/[id]" 
              options={{ 
                title: "Category",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="post/[id]" 
              options={{ 
                title: "Post",
                presentation: "card",
              }} 
            />
            <Stack.Screen 
              name="user/[id]" 
              options={{ 
                title: "Profile",
                presentation: "card",
              }} 
            />
          </Stack>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}