import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { AnalysisResult, AnalysisType } from "@/types";

// Input schema for analysis requests
const analyzeInputSchema = z.object({
  imageBase64: z.string(),
  analysisType: z.enum(['color', 'face', 'skin', 'outfit']),
});

// Mock analysis functions - in a real app, these would call AI services
const mockColorAnalysis = async (imageBase64: string): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const colorTypes = ['Musim Semi Hangat', 'Musim Panas Sejuk', 'Musim Gugur Hangat', 'Musim Dingin Sejuk'];
  const randomType = colorTypes[Math.floor(Math.random() * colorTypes.length)];
  
  return {
    id: `analysis_${Date.now()}`,
    type: 'color',
    title: randomType,
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    result: randomType,
    details: {
      palette: [
        { name: 'Coral', hex: '#FF7F50' },
        { name: 'Peach', hex: '#FFDAB9' },
        { name: 'Kuning Hangat', hex: '#FFD700' },
        { name: 'Hijau Sage', hex: '#BCB88A' },
        { name: 'Turquoise', hex: '#40E0D0' },
      ],
      description: `Warna-warnamu ${randomType.toLowerCase().includes('hangat') ? 'hangat' : 'sejuk'} dan ${randomType.toLowerCase().includes('semi') || randomType.toLowerCase().includes('dingin') ? 'cerah' : 'lembut'}, sempurna untuk menonjolkan kilau alami di wajahmu.`,
      confidence: Math.floor(Math.random() * 15) + 85, // Random confidence between 85-99%
      perfectColors: [
        '#FF7F50', '#FFDAB9', '#FFD700', '#BCB88A', '#40E0D0'
      ],
      goodColors: [
        '#FFA07A', '#FFE4B5', '#FFFFE0', '#98FB98', '#AFEEEE'
      ],
      sparinglyColors: [
        '#800000', '#000080', '#4B0082', '#2F4F4F', '#000000'
      ],
      makeupRecommendations: {
        lipstick: ['Coral', 'Peach', 'Warm Pink'],
        eyeshadow: ['Gold', 'Peach', 'Warm Brown'],
        blush: ['Coral', 'Peach', 'Warm Pink'],
      },
      clothingRecommendations: {
        tops: ['Coral', 'Peach', 'Warm Yellow', 'Sage Green'],
        bottoms: ['Khaki', 'Cream', 'Light Denim'],
        accessories: ['Turquoise', 'Coral', 'Gold'],
        metals: ['Gold', 'Rose Gold', 'Bronze'],
      },
    },
  };
};

const mockFaceShapeAnalysis = async (imageBase64: string): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const faceShapes = ['Bentuk Hati', 'Bentuk Oval', 'Bentuk Bulat', 'Bentuk Kotak', 'Bentuk Berlian'];
  const randomShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
  
  return {
    id: `analysis_${Date.now()}`,
    type: 'face',
    title: randomShape,
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    result: randomShape,
    details: {
      confidence: Math.floor(Math.random() * 15) + 85, // Random confidence between 85-99%
      features: {
        faceLength: 'Panjang wajah sekitar 1.5 kali lebar wajah',
        cheekbones: 'Tulang pipi adalah titik terlebar pada wajah',
        jawline: 'Rahang halus dan sedikit meruncing ke arah dagu',
        forehead: 'Dahi proporsional dengan wajah',
        chinShape: 'Dagu sedikit meruncing dan halus',
      },
      hairstyles: [
        { name: 'Poni samping untuk melunakkan dahi', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
        { name: 'Potongan berlapis sedang hingga panjang', rating: 'Excellent', description: 'Menyoroti struktur tulang wajah Anda' },
        { name: 'Bob sebahu yang menambah lebar di bagian bawah wajah', rating: 'Great', description: 'Menambah dimensi dan gerakan' },
        { name: 'Volume di sisi', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
      ],
      glasses: [
        { name: 'Kacamata aviator', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
        { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menyoroti tulang pipi Anda' },
        { name: 'Kacamata bulat', rating: 'Great', description: 'Melunakkan sudut dahi' },
        { name: 'Kacamata bottom-heavy', rating: 'Good', description: 'Menambah lebar di bagian bawah wajah' },
      ],
      accessories: [
        { name: 'Anting drop', rating: 'Perfect', description: 'Memperlebar area rahang' },
        { name: 'Kalung choker', rating: 'Excellent', description: 'Menarik perhatian dari dahi' },
        { name: 'Bandana', rating: 'Great', description: 'Mengurangi lebar dahi' },
        { name: 'Anting chandelier', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
      ],
    },
  };
};

const mockSkinAnalysis = async (imageBase64: string): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const skinTypes = ['Kulit Kering', 'Kulit Berminyak', 'Kulit Kombinasi', 'Kulit Normal', 'Kulit Sensitif'];
  const randomType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  
  return {
    id: `analysis_${Date.now()}`,
    type: 'skin',
    title: randomType,
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    result: randomType,
    details: {
      confidence: Math.floor(Math.random() * 15) + 85, // Random confidence between 85-99%
      concerns: ['T-zone berminyak', 'Kekeringan sesekali di pipi', 'Pori-pori membesar', 'Kemerahan ringan'],
      recommendations: [
        {
          category: 'Pembersih',
          products: ['Pembersih foam lembut', 'Pembersih berbasis gel', 'Micellar water untuk pembersihan ringan']
        },
        {
          category: 'Pelembap',
          products: ['Pelembap bebas minyak', 'Gel hidrator', 'Serum hidrasi dengan asam hialuronat']
        },
        {
          category: 'Perawatan',
          products: ['Masker tanah liat mingguan untuk T-zone', 'Masker hidrasi untuk pipi', 'Eksfoliasi lembut 1-2 kali seminggu']
        },
        {
          category: 'Perlindungan',
          products: ['Tabir surya bebas minyak SPF 30+', 'Tabir surya fisik untuk area sensitif', 'Antioksidan serum']
        }
      ],
    },
  };
};

const mockOutfitAnalysis = async (imageBase64: string): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const stylePreferences = ['Minimalist', 'Casual', 'Edgy', 'Formal', 'Bohemian', 'Sporty'];
  const randomStyle = stylePreferences[Math.floor(Math.random() * stylePreferences.length)];
  
  return {
    id: `analysis_${Date.now()}`,
    type: 'outfit',
    title: `${randomStyle} Style`,
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    result: `${randomStyle} Style`,
    details: {
      stylePreference: randomStyle,
      bodyType: 'Hourglass',
      recommendations: [
        {
          title: `${randomStyle} Chic`,
          matchScore: 95,
          items: [
            { type: 'Top', name: 'White Silk Blouse', color: 'White' },
            { type: 'Bottom', name: 'Black High-Waisted Trousers', color: 'Black' },
            { type: 'Outerwear', name: 'Beige Oversized Blazer', color: 'Beige' },
            { type: 'Shoes', name: 'Black Leather Loafers', color: 'Black' },
            { type: 'Accessories', name: 'Gold Minimal Necklace', color: 'Gold' },
          ],
        },
        {
          title: `Casual ${randomStyle}`,
          matchScore: 92,
          items: [
            { type: 'Top', name: 'Gray Crew Neck T-shirt', color: 'Gray' },
            { type: 'Bottom', name: 'Dark Blue Straight Leg Jeans', color: 'Dark Blue' },
            { type: 'Outerwear', name: 'Black Leather Jacket', color: 'Black' },
            { type: 'Shoes', name: 'White Sneakers', color: 'White' },
            { type: 'Accessories', name: 'Silver Watch', color: 'Silver' },
          ],
        },
      ],
      tips: [
        { title: 'Highlight your waist', description: 'Choose fitted or belted styles that showcase your defined waistline.' },
        { title: 'Balance proportions', description: 'Wear clothing that maintains the balance between your upper and lower body.' },
        { title: 'Avoid boxy shapes', description: 'Steer clear of shapeless garments that hide your natural curves.' },
      ],
    },
  };
};

export default publicProcedure
  .input(analyzeInputSchema)
  .mutation(async ({ input }) => {
    const { imageBase64, analysisType } = input;
    
    try {
      let result: AnalysisResult;
      
      switch (analysisType) {
        case 'color':
          result = await mockColorAnalysis(imageBase64);
          break;
        case 'face':
          result = await mockFaceShapeAnalysis(imageBase64);
          break;
        case 'skin':
          result = await mockSkinAnalysis(imageBase64);
          break;
        case 'outfit':
          result = await mockOutfitAnalysis(imageBase64);
          break;
        default:
          throw new Error(`Unsupported analysis type: ${analysisType}`);
      }
      
      return {
        success: true,
        result,
      };
    } catch (error) {
      console.error("Analysis error:", error);
      return {
        success: false,
        error: "Gagal menganalisis gambar",
      };
    }
  });