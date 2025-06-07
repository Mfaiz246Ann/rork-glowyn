import { router } from "./create-context";
import analyzeRoute from "./routes/analysis/analyze";
import getRecommendationsRoute from "./routes/products/getRecommendations";
import getProductDetailsRoute from "./routes/products/getProductDetails";
import getPostsRoute from "./routes/social/getPosts";
import getPostDetailsRoute from "./routes/social/getPostDetails";

export const appRouter = router({
  analysis: router({
    analyze: analyzeRoute,
  }),
  products: router({
    getRecommendations: getRecommendationsRoute,
    getProductDetails: getProductDetailsRoute,
  }),
  social: router({
    getPosts: getPostsRoute,
    getPostDetails: getPostDetailsRoute,
  }),
});

export type AppRouter = typeof appRouter;