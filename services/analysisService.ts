import { AnalysisResult, AnalysisType, ColorResult, ShapeResult, SkinResult, OutfitResult } from '@/types';

interface ColorPalette {
  name: string;
  hex: string;
}

// Mock analysis functions that would be replaced with actual AI analysis in production
export const analyzeColorPalette = async (imageUri: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would send the image to a backend service for analysis
  // For demo purposes, we'll return mock data
  const colorTypes = ['Musim Semi Hangat', 'Musim Panas Sejuk', 'Musim Gugur Hangat', 'Musim Dingin Sejuk'];
  const randomType = colorTypes[Math.floor(Math.random() * colorTypes.length)];
  
  let palette: ColorPalette[] = [];
  let perfectColors: string[] = [];
  let goodColors: string[] = [];
  let sparinglyColors: string[] = [];
  let makeupRecommendations = {
    lipstick: [''],
    eyeshadow: [''],
    blush: [''],
  };
  let clothingRecommendations = {
    tops: [''],
    bottoms: [''],
    accessories: [''],
    metals: [''],
  };
  
  switch (randomType) {
    case 'Musim Semi Hangat':
      palette = [
        { name: 'Coral', hex: '#FF7F50' },
        { name: 'Peach', hex: '#FFDAB9' },
        { name: 'Kuning Hangat', hex: '#FFD700' },
        { name: 'Hijau Sage', hex: '#BCB88A' },
        { name: 'Turquoise', hex: '#40E0D0' },
        { name: 'Merah Lembut', hex: '#E74C3C' },
        { name: 'Pink Hangat', hex: '#FF69B4' },
        { name: 'Coklat Emas', hex: '#CD853F' },
      ];
      perfectColors = ['#FF7F50', '#FFDAB9', '#FFD700', '#BCB88A', '#40E0D0'];
      goodColors = ['#FFA07A', '#FFE4B5', '#FFFFE0', '#98FB98', '#AFEEEE'];
      sparinglyColors = ['#800000', '#000080', '#4B0082', '#2F4F4F', '#000000'];
      makeupRecommendations = {
        lipstick: ['Coral', 'Peach', 'Warm Pink'],
        eyeshadow: ['Gold', 'Peach', 'Warm Brown'],
        blush: ['Coral', 'Peach', 'Warm Pink'],
      };
      clothingRecommendations = {
        tops: ['Coral', 'Peach', 'Warm Yellow', 'Sage Green'],
        bottoms: ['Khaki', 'Cream', 'Light Denim'],
        accessories: ['Turquoise', 'Coral', 'Gold'],
        metals: ['Gold', 'Rose Gold', 'Bronze'],
      };
      break;
    case 'Musim Panas Sejuk':
      palette = [
        { name: 'Lavender', hex: '#E6E6FA' },
        { name: 'Biru Powder', hex: '#B0E0E6' },
        { name: 'Pink Lembut', hex: '#FFC0CB' },
        { name: 'Mauve', hex: '#E0B0FF' },
        { name: 'Periwinkle', hex: '#CCCCFF' },
        { name: 'Dusty Rose', hex: '#DCAE96' },
        { name: 'Abu Slate', hex: '#708090' },
        { name: 'Seafoam', hex: '#8FBC8F' },
      ];
      perfectColors = ['#E6E6FA', '#B0E0E6', '#FFC0CB', '#E0B0FF', '#CCCCFF'];
      goodColors = ['#F0F8FF', '#E0FFFF', '#FFE4E1', '#D8BFD8', '#F0FFF0'];
      sparinglyColors = ['#8B0000', '#006400', '#8B4513', '#000000', '#FF4500'];
      makeupRecommendations = {
        lipstick: ['Soft Pink', 'Mauve', 'Rose'],
        eyeshadow: ['Lavender', 'Soft Blue', 'Cool Gray'],
        blush: ['Soft Pink', 'Mauve', 'Cool Pink'],
      };
      clothingRecommendations = {
        tops: ['Soft Pink', 'Powder Blue', 'Lavender', 'Mint Green'],
        bottoms: ['Light Gray', 'Soft Blue', 'Lavender'],
        accessories: ['Silver', 'Soft Pink', 'Powder Blue'],
        metals: ['Silver', 'White Gold', 'Platinum'],
      };
      break;
    case 'Musim Gugur Hangat':
      palette = [
        { name: 'Rust', hex: '#B7410E' },
        { name: 'Olive', hex: '#808000' },
        { name: 'Mustard', hex: '#FFDB58' },
        { name: 'Terracotta', hex: '#E2725B' },
        { name: 'Hijau Hutan', hex: '#228B22' },
        { name: 'Oranye Terbakar', hex: '#CC5500' },
        { name: 'Teal', hex: '#008080' },
        { name: 'Burgundy', hex: '#800020' },
      ];
      perfectColors = ['#B7410E', '#808000', '#FFDB58', '#E2725B', '#228B22'];
      goodColors = ['#A0522D', '#6B8E23', '#DAA520', '#CD5C5C', '#2E8B57'];
      sparinglyColors = ['#00BFFF', '#FF69B4', '#9400D3', '#000000', '#00FFFF'];
      makeupRecommendations = {
        lipstick: ['Terracotta', 'Brick Red', 'Warm Brown'],
        eyeshadow: ['Copper', 'Olive Green', 'Warm Brown'],
        blush: ['Terracotta', 'Warm Peach', 'Bronze'],
      };
      clothingRecommendations = {
        tops: ['Rust', 'Olive Green', 'Mustard', 'Terracotta'],
        bottoms: ['Dark Brown', 'Olive Green', 'Khaki'],
        accessories: ['Amber', 'Tortoise Shell', 'Copper'],
        metals: ['Gold', 'Copper', 'Bronze'],
      };
      break;
    case 'Musim Dingin Sejuk':
      palette = [
        { name: 'Biru Royal', hex: '#4169E1' },
        { name: 'Emerald', hex: '#50C878' },
        { name: 'Merah Ruby', hex: '#E0115F' },
        { name: 'Ungu Cerah', hex: '#8A2BE2' },
        { name: 'Biru Es', hex: '#A5F2F3' },
        { name: 'Fuchsia', hex: '#FF00FF' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Pink Cerah', hex: '#FF007F' },
      ];
      perfectColors = ['#4169E1', '#50C878', '#E0115F', '#8A2BE2', '#A5F2F3'];
      goodColors = ['#0000CD', '#00FF00', '#FF0000', '#9932CC', '#00FFFF'];
      sparinglyColors = ['#F4A460', '#D2B48C', '#F5DEB3', '#DEB887', '#D2691E'];
      makeupRecommendations = {
        lipstick: ['True Red', 'Plum', 'Berry'],
        eyeshadow: ['Navy', 'Plum', 'Silver'],
        blush: ['Cool Pink', 'Plum', 'Berry'],
      };
      clothingRecommendations = {
        tops: ['True Red', 'Royal Blue', 'Pure White', 'Emerald'],
        bottoms: ['Black', 'Navy', 'Charcoal'],
        accessories: ['Silver', 'Black', 'Jewel Tones'],
        metals: ['Silver', 'White Gold', 'Platinum'],
      };
      break;
  }
  
  const confidence = Math.floor(Math.random() * 15) + 85; // Random confidence between 85-99%
  
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
      palette,
      description: `Warna-warnamu ${randomType.toLowerCase().includes('hangat') ? 'hangat' : 'sejuk'} dan ${randomType.toLowerCase().includes('semi') || randomType.toLowerCase().includes('dingin') ? 'cerah' : 'lembut'}, sempurna untuk menonjolkan kilau alami di wajahmu.`,
      confidence,
      perfectColors,
      goodColors,
      sparinglyColors,
      makeupRecommendations,
      clothingRecommendations,
    },
  };
};

export const analyzeFaceShape = async (imageUri: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock face shape analysis
  const faceShapes = ['Bentuk Hati', 'Bentuk Oval', 'Bentuk Bulat', 'Bentuk Kotak', 'Bentuk Berlian', 'Bentuk Persegi Panjang'];
  const randomShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
  
  const confidence = Math.floor(Math.random() * 15) + 85; // Random confidence between 85-99%
  
  let features = {};
  let hairstyles = [];
  let glasses = [];
  let accessories = [];
  
  switch (randomShape) {
    case 'Bentuk Hati':
      features = {
        faceLength: 'Panjang wajah lebih dari lebar wajah',
        cheekbones: 'Tulang pipi tinggi dan lebar',
        jawline: 'Rahang meruncing ke arah dagu',
        forehead: 'Dahi lebar, titik terlebar pada wajah',
        chinShape: 'Dagu sempit dan meruncing',
      };
      hairstyles = [
        { name: 'Rambut medium dengan lapisan', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
        { name: 'Poni', rating: 'Excellent', description: 'Mengurangi lebar dahi' },
        { name: 'Potongan bob', rating: 'Great', description: 'Menambah lebar di bagian bawah wajah' },
        { name: 'Volume di sisi', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
      ];
      glasses = [
        { name: 'Kacamata aviator', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
        { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menyoroti tulang pipi Anda' },
        { name: 'Kacamata bulat', rating: 'Great', description: 'Melunakkan sudut dahi' },
        { name: 'Kacamata bottom-heavy', rating: 'Good', description: 'Menambah lebar di bagian bawah wajah' },
      ];
      accessories = [
        { name: 'Anting drop', rating: 'Perfect', description: 'Memperlebar area rahang' },
        { name: 'Kalung choker', rating: 'Excellent', description: 'Menarik perhatian dari dahi' },
        { name: 'Bandana', rating: 'Great', description: 'Mengurangi lebar dahi' },
        { name: 'Anting chandelier', rating: 'Good', description: 'Menyeimbangkan dagu yang meruncing' },
      ];
      break;
    case 'Bentuk Oval':
      features = {
        faceLength: 'Panjang wajah sekitar 1.5 kali lebar wajah',
        cheekbones: 'Tulang pipi adalah titik terlebar pada wajah',
        jawline: 'Rahang halus dan sedikit meruncing ke arah dagu',
        forehead: 'Dahi proporsional dengan wajah',
        chinShape: 'Dagu sedikit meruncing dan halus',
      };
      hairstyles = [
        { name: 'Hampir semua gaya rambut', rating: 'Perfect', description: 'Bentuk wajah Anda sangat serbaguna' },
        { name: 'Potongan bob', rating: 'Excellent', description: 'Menyoroti struktur tulang wajah Anda' },
        { name: 'Lapisan panjang', rating: 'Great', description: 'Menambah dimensi dan gerakan' },
        { name: 'Pixie cut', rating: 'Good', description: 'Menonjolkan fitur wajah Anda' },
      ];
      glasses = [
        { name: 'Kacamata persegi', rating: 'Perfect', description: 'Menciptakan kontras dengan wajah Anda' },
        { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menambah dimensi ke wajah Anda' },
        { name: 'Kacamata aviator', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
        { name: 'Kacamata bulat', rating: 'Good', description: 'Menciptakan keseimbangan yang menarik' },
      ];
      accessories = [
        { name: 'Anting panjang', rating: 'Perfect', description: 'Menyoroti panjang wajah Anda' },
        { name: 'Kalung pendek', rating: 'Excellent', description: 'Menarik perhatian ke leher Anda' },
        { name: 'Topi fedora', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
        { name: 'Bandana', rating: 'Good', description: 'Menambah gaya tanpa mengganggu keseimbangan' },
      ];
      break;
    // Add other cases for different face shapes
    default:
      features = {
        faceLength: 'Panjang wajah sekitar 1.5 kali lebar wajah',
        cheekbones: 'Tulang pipi adalah titik terlebar pada wajah',
        jawline: 'Rahang halus dan sedikit meruncing ke arah dagu',
        forehead: 'Dahi proporsional dengan wajah',
        chinShape: 'Dagu sedikit meruncing dan halus',
      };
      hairstyles = [
        { name: 'Hampir semua gaya rambut', rating: 'Perfect', description: 'Bentuk wajah Anda sangat serbaguna' },
        { name: 'Potongan bob', rating: 'Excellent', description: 'Menyoroti struktur tulang wajah Anda' },
        { name: 'Lapisan panjang', rating: 'Great', description: 'Menambah dimensi dan gerakan' },
        { name: 'Pixie cut', rating: 'Good', description: 'Menonjolkan fitur wajah Anda' },
      ];
      glasses = [
        { name: 'Kacamata persegi', rating: 'Perfect', description: 'Menciptakan kontras dengan wajah Anda' },
        { name: 'Kacamata kucing', rating: 'Excellent', description: 'Menambah dimensi ke wajah Anda' },
        { name: 'Kacamata aviator', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
        { name: 'Kacamata bulat', rating: 'Good', description: 'Menciptakan keseimbangan yang menarik' },
      ];
      accessories = [
        { name: 'Anting panjang', rating: 'Perfect', description: 'Menyoroti panjang wajah Anda' },
        { name: 'Kalung pendek', rating: 'Excellent', description: 'Menarik perhatian ke leher Anda' },
        { name: 'Topi fedora', rating: 'Great', description: 'Melengkapi bentuk wajah Anda' },
        { name: 'Bandana', rating: 'Good', description: 'Menambah gaya tanpa mengganggu keseimbangan' },
      ];
  }
  
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
      confidence,
      features,
      hairstyles,
      glasses,
      accessories,
    },
  };
};

export const analyzeSkinType = async (imageUri: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock skin analysis
  const skinTypes = ['Kulit Kering', 'Kulit Berminyak', 'Kulit Kombinasi', 'Kulit Normal', 'Kulit Sensitif'];
  const randomType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  
  const confidence = Math.floor(Math.random() * 15) + 85; // Random confidence between 85-99%
  
  let concerns: string[] = [];
  let recommendations: { category: string; products: string[] }[] = [];
  
  switch (randomType) {
    case 'Kulit Kering':
      concerns = ['Kulit mengelupas', 'Rasa kencang', 'Garis halus', 'Tekstur kasar'];
      recommendations = [
        {
          category: 'Pembersih',
          products: ['Pembersih berbasis krim dengan bahan pelembap', 'Cleansing balm', 'Cleansing oil']
        },
        {
          category: 'Pelembap',
          products: ['Pelembap kaya dengan ceramide dan asam hialuronat', 'Minyak wajah seperti argan atau rosehip', 'Krim malam yang kaya']
        },
        {
          category: 'Perawatan',
          products: ['Masker hidrasi mingguan', 'Serum dengan vitamin E', 'Essence berbasis air']
        },
        {
          category: 'Perlindungan',
          products: ['Tabir surya berbasis krim', 'Tabir surya dengan komponen pelembap', 'Primer wajah pelembap']
        }
      ];
      break;
    case 'Kulit Berminyak':
      concerns = ['Sebum berlebih', 'Pori-pori membesar', 'Rentan berjerawat', 'Tampilan mengkilap'];
      recommendations = [
        {
          category: 'Pembersih',
          products: ['Pembersih gel atau foam dengan asam salisilat', 'Pembersih dengan clay', 'Micellar water untuk pembersihan ringan']
        },
        {
          category: 'Pelembap',
          products: ['Pelembap bebas minyak, non-comedogenic', 'Gel hidrator', 'Serum berbasis air']
        },
        {
          category: 'Perawatan',
          products: ['Masker tanah liat 1-2 kali seminggu', 'Serum niacinamide untuk mengatur produksi minyak', 'Perawatan dengan BHA']
        },
        {
          category: 'Perlindungan',
          products: ['Tabir surya bebas minyak', 'Tabir surya gel', 'Setting spray dengan SPF']
        }
      ];
      break;
    // Add other cases for different skin types
    default:
      concerns = ['T-zone berminyak', 'Kekeringan sesekali di pipi', 'Tekstur tidak merata', 'Jerawat sesekali'];
      recommendations = [
        {
          category: 'Pembersih',
          products: ['Pembersih foam lembut', 'Pembersih dengan pH seimbang', 'Micellar water untuk pembersihan ringan']
        },
        {
          category: 'Pelembap',
          products: ['Pelembap ringan yang menyeimbangkan', 'Gel krim hibrida', 'Serum hidrasi dengan asam hialuronat']
        },
        {
          category: 'Perawatan',
          products: ['Masker tanah liat mingguan untuk T-zone', 'Masker hidrasi untuk pipi', 'Eksfoliasi lembut 1-2 kali seminggu']
        },
        {
          category: 'Perlindungan',
          products: ['Tabir surya bebas minyak untuk T-zone', 'Tabir surya berbasis krim untuk pipi', 'Primer yang menyeimbangkan']
        }
      ];
  }
  
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
      confidence,
      concerns,
      recommendations,
    },
  };
};

export const analyzeOutfit = async (
  stylePreference: string,
  bodyType?: string,
  occasion?: string,
  weather?: string
): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock outfit analysis
  const stylePreferences = ['Minimalist', 'Casual', 'Edgy', 'Formal', 'Bohemian', 'Sporty'];
  const actualStyle = stylePreference || stylePreferences[Math.floor(Math.random() * stylePreferences.length)];
  
  return {
    id: `analysis_${Date.now()}`,
    type: 'outfit',
    title: `${actualStyle} Style`,
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    result: `${actualStyle} Style`,
    details: {
      stylePreference: actualStyle,
      bodyType: bodyType || 'Hourglass',
      occasion: occasion || 'Casual',
      weather: weather || 'Warm',
      recommendations: [
        {
          title: `${actualStyle} Chic`,
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
          title: `Casual ${actualStyle}`,
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

export const performAnalysis = async (
  imageUri: string, 
  analysisType: AnalysisType
): Promise<AnalysisResult> => {
  switch (analysisType) {
    case 'color':
      return await analyzeColorPalette(imageUri);
    case 'face':
      return await analyzeFaceShape(imageUri);
    case 'skin':
      return await analyzeSkinType(imageUri);
    case 'outfit':
      return await analyzeOutfit('');
    default:
      throw new Error(`Unsupported analysis type: ${analysisType}`);
  }
};