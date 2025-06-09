import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { CommentResponse, Comment } from "@/types";

// Input schema for creating a comment
const createCommentSchema = z.object({
  postId: z.string(),
  text: z.string().min(1),
  userId: z.string(),
  username: z.string(),
  userImage: z.string().optional(),
});

const createCommentProcedure = publicProcedure
  .input(createCommentSchema)
  .mutation(({ input }): CommentResponse => {
    const { postId, text, userId, username, userImage } = input;
    
    try {
      // Create a new comment
      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        postId,
        userId,
        userName: username,
        userAvatar: userImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        text,
        date: new Date().toISOString(),
      };
      
      return {
        success: true,
        comment: newComment,
      };
    } catch (error) {
      console.error("Error creating comment:", error);
      return {
        success: false,
        error: "Failed to create comment",
      };
    }
  });

export default createCommentProcedure;