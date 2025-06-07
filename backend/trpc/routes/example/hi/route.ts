import { publicProcedure } from "../../../create-context";

const hiProcedure = publicProcedure.query(() => {
  return {
    greeting: "Hello from tRPC server!",
    timestamp: new Date().toISOString(),
  };
});

export default hiProcedure;