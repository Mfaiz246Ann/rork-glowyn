import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { AnalysisResult } from "@/types";

// Input schema for saving analysis results
const saveAnalysisSchema = z.object({
  result: z.object({
    id: z.string(),
    type: z.enum(['color', 'face', 'skin', 'outfit']),
    title: z.string(),
    date: z.string(),
    result: z.string(),
    details: z.any(),
  }),
});

const saveAnalysisResultProcedure = publicProcedure
  .input(saveAnalysisSchema)
  .mutation(({ input }) => {
    const { result } = input;
    
    // In a real app, this would save the analysis result to the user's profile in the database
    // For this demo, we'll just return success
    
    return {
      success: true,
      message: "Analysis result saved successfully",
      resultId: result.id,
    };
  });

export default saveAnalysisResultProcedure;