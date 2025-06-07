import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  // For development with Expo
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // Fallback for when no base URL is available
  return "https://toolkit.rork.com";
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      // Add fetch options for better error handling
      fetch: async (url, options) => {
        try {
          const response = await fetch(url, {
            ...options,
            headers: {
              ...options?.headers,
              "Content-Type": "application/json",
            },
            // Add timeout to prevent hanging requests
            signal: AbortSignal.timeout(15000), // 15 second timeout
          });
          
          if (!response.ok) {
            console.warn(`TRPC response not OK: ${response.status} ${response.statusText}`);
          }
          
          return response;
        } catch (error) {
          console.error("TRPC fetch error:", error);
          
          // For development: mock successful response when backend is unavailable
          if (process.env.NODE_ENV === 'development') {
            console.warn("Using mock response in development mode");
            
            // Create a mock response based on the URL path
            const url_string = url.toString();
            let mockData = { result: { data: null } };
            
            if (url_string.includes('analysis.analyze')) {
              // Mock analysis response
              const analysisTypes = ['color', 'face', 'skin', 'outfit'];
              const randomType = analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
              
              mockData = {
                result: {
                  data: {
                    success: true,
                    result: {
                      id: `mock_${Date.now()}`,
                      type: randomType,
                      title: `Mock ${randomType} analysis`,
                      result: `Mock ${randomType} result`,
                      date: new Date().toISOString(),
                      details: { mockData: true }
                    }
                  }
                }
              };
            }
            
            return new Response(JSON.stringify(mockData), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          
          throw error;
        }
      },
    }),
  ],
});