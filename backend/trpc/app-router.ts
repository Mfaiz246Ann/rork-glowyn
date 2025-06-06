import { createTRPCRouter } from './create-context';
import hiProcedure from './routes/example/hi/route';
import getProfile from './routes/users/getProfile';
import updateProfile from './routes/users/updateProfile';
import saveAnalysisResult from './routes/users/saveAnalysisResult';
import analyze from './routes/analysis/analyze';
import getProductDetails from './routes/products/getProductDetails';
import getRecommendations from './routes/products/getRecommendations';
import getPosts from './routes/social/getPosts';
import getPostDetails from './routes/social/getPostDetails';
import createComment from './routes/social/createComment';
import likePost from './routes/social/likePost';

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiProcedure,
  }),
  users: createTRPCRouter({
    getProfile,
    updateProfile,
    saveAnalysisResult,
  }),
  analysis: createTRPCRouter({
    analyze,
  }),
  products: createTRPCRouter({
    getProductDetails,
    getRecommendations,
  }),
  social: createTRPCRouter({
    getPosts,
    getPostDetails,
    createComment,
    likePost,
  }),
});

export type AppRouter = typeof appRouter;