import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { AnalysisResult } from "@/types";

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
      recommendations: [
        'Poni samping untuk melunakkan dahi',
        'Potongan berlapis sedang hingga panjang',
        'Bob sebahu yang menambah lebar di bagian bawah wajah',
        'Kacamata cat-eye atau oval',
        'Anting drop yang memperlebar area rahang',
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
      concerns: ['T-zone berminyak', 'Kekeringan sesekali di pipi'],
      recommendations: [
        'Pembersih foam lembut',
        'Pelembap bebas minyak',
        'Masker tanah liat mingguan untuk T-zone',
        'Serum hidrasi dengan asam hialuronat',
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