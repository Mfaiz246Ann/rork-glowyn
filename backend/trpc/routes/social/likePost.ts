import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { LikeResponse } from "@/types";

// Input schema for liking/unliking a post
const likePostSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  action: z.enum(['like', 'unlike']),
});

const likePostProcedure = publicProcedure
  .input(likePostSchema)
  .mutation(({ input }): LikeResponse => {
    const { postId, userId, action } = input;
    
    try {
      // In a real app, we would update the database here
      // For now, we'll just return success
      console.log(`User ${userId} ${action}d post ${postId}`);
      
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      return {
        success: false,
        error: `Failed to ${action} post`,
      };
    }
  });

export default likePostProcedure;