import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { Comment } from "@/types";

// Input schema for creating a comment
const createCommentSchema = z.object({
  postId: z.string(),
  text: z.string().min(1).max(500),
  userId: z.string(),
  username: z.string(),
  userImage: z.string(),
});

export default publicProcedure
  .input(createCommentSchema)
  .mutation(({ input }) => {
    const { postId, text, userId, username, userImage } = input;
    
    // In a real app, this would save the comment to the database
    // For this demo, we'll just return a mock comment
    
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      userId,
      username,
      userImage,
      text,
      timestamp: new Date().toISOString(),
    };
    
    return {
      success: true,
      comment: newComment,
    };
  });