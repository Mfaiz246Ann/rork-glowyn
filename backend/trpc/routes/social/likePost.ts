import { z } from "zod";
import { publicProcedure } from "../../create-context";

// Input schema for liking/unliking a post
const likePostSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  action: z.enum(['like', 'unlike']),
});

export default publicProcedure
  .input(likePostSchema)
  .mutation(({ input }) => {
    const { postId, userId, action } = input;
    
    // In a real app, this would update the likes in the database
    // For this demo, we'll just return success
    
    return {
      success: true,
      message: action === 'like' ? "Post liked successfully" : "Post unliked successfully",
      postId,
      userId,
    };
  });