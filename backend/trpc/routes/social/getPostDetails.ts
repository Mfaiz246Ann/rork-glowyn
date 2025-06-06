import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { feedPosts } from "@/mocks/feed";
import { comments } from "@/mocks/feed";

export default publicProcedure
  .input(z.object({ postId: z.string() }))
  .query(({ input }) => {
    const { postId } = input;
    
    // Find the post by ID
    const post = feedPosts.find(p => p.id === postId);
    
    if (!post) {
      return {
        success: false,
        error: "Post not found",
      };
    }
    
    // Get comments for this post
    const postComments = comments[postId] || [];
    
    return {
      success: true,
      post,
      comments: postComments,
    };
  });