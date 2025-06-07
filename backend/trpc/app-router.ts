import { router } from "./create-context";
import { hiProcedure } from "./routes/example/hi/route";
import { getProfileProcedure } from "./routes/users/getProfile";
import { updateProfileProcedure } from "./routes/users/updateProfile";
import { saveAnalysisResultProcedure } from "./routes/users/saveAnalysisResult";
import { getRecommendationsProcedure } from "./routes/products/getRecommendations";
import { getProductDetailsProcedure } from "./routes/products/getProductDetails";
import { getPostsProcedure } from "./routes/social/getPosts";
import { getPostDetailsProcedure } from "./routes/social/getPostDetails";
import { createCommentProcedure } from "./routes/social/createComment";
import { likePostProcedure } from "./routes/social/likePost";
import analyzeProcedure from "./routes/analysis/analyze";

export const appRouter = router({
  example: router({
    hi: hiProcedure,
  }),
  users: router({
    getProfile: getProfileProcedure,
    updateProfile: updateProfileProcedure,
    saveAnalysisResult: saveAnalysisResultProcedure,
  }),
  products: router({
    getRecommendations: getRecommendationsProcedure,
    getProductDetails: getProductDetailsProcedure,
  }),
  social: router({
    getPosts: getPostsProcedure,
    getPostDetails: getPostDetailsProcedure,
    createComment: createCommentProcedure,
    likePost: likePostProcedure,
  }),
  analysis: router({
    analyze: analyzeProcedure,
  }),
});

export type AppRouter = typeof appRouter;