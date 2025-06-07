import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import { AnalysisResponse, AnalysisType } from "@/types";

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  // For development with Expo
  if (process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_RORK_API_BASE_URL;
  }

  // Fallback for when no base URL is available
  return "https://toolkit.rork.com";
};

// Longer timeout for slower connections or complex operations
const FETCH_TIMEOUT_MS = 30000; // 30 seconds

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      // Add fetch options for better error handling
      fetch: async (url, options) => {
        try {
          console.log(`TRPC request to: ${url.toString()}`);
          
          const response = await fetch(url, {
            ...options,
            headers: {
              ...options?.headers,
              "Content-Type": "application/json",
            },
            // Add timeout to prevent hanging requests
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
          });
          
          if (!response.ok) {
            console.warn(`TRPC response not OK: ${response.status} ${response.statusText}`);
          }
          
          return response;
        } catch (error) {
          // Log the specific error type and message
          if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error("Network connection error. Check your internet connection.");
          } else if (error instanceof DOMException && error.name === "AbortError") {
            console.error(`Request timed out after ${FETCH_TIMEOUT_MS}ms`);
          } else {
            console.error("TRPC fetch error:", error);
          }
          
          // For development: mock successful response when backend is unavailable
          if (process.env.NODE_ENV === 'development') {
            console.warn("Using mock response in development mode");
            
            // Create a mock response based on the URL path
            const url_string = url.toString();
            let mockData: any = { result: { data: null } };
            
            if (url_string.includes('analysis.analyze')) {
              // Mock analysis response
              const analysisTypes: AnalysisType[] = ['color', 'face', 'skin', 'outfit'];
              const randomType = analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
              
              // Create mock response with correct structure matching AnalysisResponse
              const mockResponse: AnalysisResponse = {
                success: true,
                result: {
                  id: `mock_${Date.now()}`,
                  type: randomType,
                  title: `Mock ${randomType} analysis`,
                  result: `Mock ${randomType} result`,
                  date: new Date().toISOString(),
                  details: { mockData: true }
                }
              };
              
              // Structure the response according to tRPC's expected format
              mockData = {
                result: {
                  data: mockResponse
                }
              };
            } else if (url_string.includes('products.getRecommendations')) {
              // Mock products response
              mockData = {
                result: {
                  data: {
                    success: true,
                    products: [
                      {
                        id: "1",
                        name: "Lipstik Coral Shine",
                        description: "Lipstik dengan warna coral yang cerah dan formula tahan lama.",
                        price: 189000,
                        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        category: "makeup",
                        rating: 4.5,
                        reviews: 120,
                        brand: "BeautyGlow",
                        currency: "IDR"
                      },
                      {
                        id: "2",
                        name: "Eyeshadow Palette Warm Tones",
                        description: "Palet eyeshadow dengan 12 warna hangat yang cocok untuk kulit Asia.",
                        price: 350000,
                        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        category: "makeup",
                        rating: 4.8,
                        reviews: 89,
                        brand: "ColorPop",
                        currency: "IDR"
                      }
                    ]
                  }
                }
              };
            } else if (url_string.includes('social.getPosts')) {
              // Mock social posts response
              mockData = {
                result: {
                  data: {
                    success: true,
                    posts: [
                      {
                        id: "1",
                        userId: "user1",
                        userName: "Anisa Wijaya",
                        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                        caption: "Outfit of the day! Loving this new blouse from StyleFusion.",
                        likes: 120,
                        comments: 24,
                        date: new Date().toISOString(),
                        products: [
                          {
                            id: "8",
                            name: "Atasan Coral Blouse",
                            description: "Blouse warna coral dengan potongan yang flattering untuk semua bentuk tubuh.",
                            price: 320000,
                            image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            category: "clothing",
                            rating: 4.2,
                            reviews: 45,
                            brand: "StyleFusion",
                            currency: "IDR"
                          }
                        ]
                      }
                    ],
                    nextCursor: null
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