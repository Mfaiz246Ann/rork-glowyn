import { router } from "./create-context";
import hiProcedure from "./routes/example/hi/route";
import analyzeProcedure from "./routes/analysis/analyze";
import getUserProfileProcedure from "./routes/users/getProfile";
import updateUserProfileProcedure from "./routes/users/updateProfile";
import saveAnalysisResultProcedure from "./routes/users/saveAnalysisResult";
import getPostsProcedure from "./routes/social/getPosts";
import getPostDetailsProcedure from "./routes/social/getPostDetails";
import createCommentProcedure from "./routes/social/createComment";
import likePostProcedure from "./routes/social/likePost";
import getRecommendationsProcedure from "./routes/products/getRecommendations";
import getProductDetailsProcedure from "./routes/products/getProductDetails";

export const appRouter = router({
  example: router({
    hi: hiProcedure,
  }),
  analysis: router({
    analyze: analyzeProcedure,
  }),
  users: router({
    getProfile: getUserProfileProcedure,
    updateProfile: updateUserProfileProcedure,
    saveAnalysisResult: saveAnalysisResultProcedure,
  }),
  social: router({
    getPosts: getPostsProcedure,
    getPostDetails: getPostDetailsProcedure,
    createComment: createCommentProcedure,
    likePost: likePostProcedure,
  }),
  products: router({
    getRecommendations: getRecommendationsProcedure,
    getProductDetails: getProductDetailsProcedure,
  }),
});

export type AppRouter = typeof appRouter;