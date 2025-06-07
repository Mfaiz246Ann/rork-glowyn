import { router } from "./create-context";
import analyzeRoute from "./routes/analysis/analyze";

export const appRouter = router({
  analysis: router({
    analyze: analyzeRoute,
  }),
});

export type AppRouter = typeof appRouter;