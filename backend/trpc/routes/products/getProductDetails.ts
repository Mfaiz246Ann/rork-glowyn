import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { featuredProducts } from "@/mocks/products";

export default publicProcedure
  .input(z.object({ productId: z.string() }))
  .query(({ input }) => {
    const { productId } = input;
    
    // Find the product by ID
    const product = featuredProducts.find(p => p.id === productId);
    
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }
    
    return {
      success: true,
      product,
    };
  });