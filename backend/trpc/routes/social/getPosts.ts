import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { feedPosts } from "@/mocks/feed";
import { SocialPostsResponse } from "@/types";

// Input schema for fetching posts
const getPostsSchema = z.object({
  userId: z.string().optional(),
  limit: z.number().min(1).max(50).optional().default(10),
  cursor: z.string().optional(), // For pagination
});

const getPostsProcedure = publicProcedure
  .input(getPostsSchema)
  .query(({ input }): SocialPostsResponse => {
    const { userId, limit, cursor } = input;
    
    try {
      let filteredPosts = [...feedPosts];
      
      // Filter by user if userId is provided
      if (userId) {
        filteredPosts = filteredPosts.filter(post => post.userId === userId);
      }
      
      // Sort posts by date (newest first)
      filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // In a real app, we would implement proper cursor-based pagination
      // For this demo, we'll just limit the results
      const startIndex = cursor ? filteredPosts.findIndex(post => post.id === cursor) + 1 : 0;
      const endIndex = startIndex + limit;
      const limitedPosts = filteredPosts.slice(startIndex, endIndex);
      
      const nextCursor = endIndex < filteredPosts.length ? filteredPosts[endIndex - 1].id : null;
      
      return {
        success: true,
        posts: limitedPosts,
        nextCursor,
      };
    } catch (error) {
      console.error("Error in getPosts:", error);
      return {
        success: false,
        error: "Failed to fetch posts",
      };
    }
  });

export default getPostsProcedure;