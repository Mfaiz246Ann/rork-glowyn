import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { UserProfile } from "@/types";
import { currentUser, popularUsers } from "@/mocks/users";

export default publicProcedure
  .input(z.object({ userId: z.string().optional() }))
  .query(({ input }) => {
    const { userId } = input;
    
    // If no userId is provided, return the current user
    if (!userId) {
      return {
        success: true,
        profile: currentUser,
      };
    }
    
    // Find the user by ID
    const user = userId === currentUser.id 
      ? currentUser 
      : popularUsers.find(u => u.id === userId);
    
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    
    return {
      success: true,
      profile: user,
    };
  });