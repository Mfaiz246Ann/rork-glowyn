import { AnalysisResult, AnalysisType } from '@/types';

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
      break;
  }
  
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
    },
  };
};

export const analyzeFaceShape = async (imageUri: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock face shape analysis
  const faceShapes = ['Bentuk Hati', 'Bentuk Oval', 'Bentuk Bulat', 'Bentuk Kotak', 'Bentuk Berlian', 'Bentuk Persegi Panjang'];
  const randomShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
  
  let recommendations: string[] = [];
  switch (randomShape) {
    case 'Bentuk Hati':
      recommendations = [
        'Poni samping untuk melunakkan dahi',
        'Potongan berlapis sedang hingga panjang',
        'Bob sebahu yang menambah lebar di bagian bawah wajah',
        'Kacamata cat-eye atau oval',
        'Anting drop yang memperlebar area rahang',
      ];
      break;
    case 'Bentuk Oval':
      recommendations = [
        'Hampir semua gaya rambut cocok dengan proporsi wajah yang seimbang',
        'Coba gaya berani seperti pixie cut atau layer panjang dramatis',
        'Kacamata persegi panjang atau kotak melengkapi wajah',
        'Semua gaya anting cocok, bereksperimenlah dengan bebas',
        'Anggap dirimu beruntung - ini bentuk wajah paling serbaguna!',
      ];
      break;
    case 'Bentuk Bulat':
      recommendations = [
        'Potongan berlapis dengan tinggi di mahkota untuk memanjangkan wajah',
        'Gaya berbelah samping untuk menciptakan asimetri',
        'Bob bersudut yang jatuh di bawah dagu',
        'Kacamata persegi panjang atau bersudut untuk menambah definisi',
        'Anting panjang menjuntai untuk menciptakan panjang',
      ];
      break;
    case 'Bentuk Kotak':
      recommendations = [
        'Layer lembut di sekitar wajah untuk melunakkan garis rahang bersudut',
        'Poni samping dan ujung bergelombang',
        'Potongan sebahu atau lebih panjang dengan gelombang',
        'Kacamata bulat atau oval untuk menyeimbangkan sudut yang kuat',
        'Anting bulat atau tetes air mata untuk melunakkan garis rahang',
      ];
      break;
    case 'Bentuk Berlian':
      recommendations = [
        'Bob sebahu atau gaya yang menambah lebar di garis rahang',
        'Poni samping untuk menonjolkan tulang pipi',
        'Gaya dengan volume di tingkat dagu',
        'Kacamata tanpa bingkai atau oval',
        'Anting kancing atau cluster yang tidak melampaui tulang pipi',
      ];
      break;
    case 'Bentuk Persegi Panjang':
      recommendations = [
        'Gaya dengan volume di samping untuk menambah lebar',
        'Potongan berlapis dengan poni untuk mempersingkat panjang wajah',
        'Gelombang atau ikal untuk menambah kelembutan dan lebar',
        'Kacamata bulat atau kotak dengan pelipis dekoratif',
        'Anting cluster atau kancing untuk menambah lebar',
      ];
      break;
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
      recommendations,
    },
  };
};

export const analyzeSkinType = async (imageUri: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock skin analysis
  const skinTypes = ['Kulit Kering', 'Kulit Berminyak', 'Kulit Kombinasi', 'Kulit Normal', 'Kulit Sensitif'];
  const randomType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  
  let concerns: string[] = [];
  let recommendations: string[] = [];
  
  switch (randomType) {
    case 'Kulit Kering':
      concerns = ['Kulit mengelupas', 'Rasa kencang', 'Garis halus', 'Tekstur kasar'];
      recommendations = [
        'Pembersih berbasis krim dengan bahan pelembap',
        'Pelembap kaya dengan ceramide dan asam hialuronat',
        'Minyak wajah seperti argan atau rosehip',
        'Masker hidrasi mingguan',
        'Hindari air panas dan sabun keras',
      ];
      break;
    case 'Kulit Berminyak':
      concerns = ['Sebum berlebih', 'Pori-pori membesar', 'Rentan berjerawat', 'Tampilan mengkilap'];
      recommendations = [
        'Pembersih gel atau foam dengan asam salisilat',
        'Pelembap bebas minyak, non-comedogenic',
        'Masker tanah liat 1-2 kali seminggu',
        'Serum niacinamide untuk mengatur produksi minyak',
        'Kertas minyak untuk kontrol kilap siang hari',
      ];
      break;
    case 'Kulit Kombinasi':
      concerns = ['T-zone berminyak', 'Pipi kering', 'Tekstur tidak merata', 'Jerawat sesekali'];
      recommendations = [
        'Pembersih foam lembut',
        'Pelembap ringan yang menyeimbangkan',
        'Perawatan bertarget (hidrasi untuk area kering, mattifying untuk area berminyak)',
        'Masker tanah liat mingguan untuk T-zone, masker hidrasi untuk pipi',
        'Toner bebas alkohol dengan bahan penyeimbang',
      ];
      break;
    case 'Kulit Normal':
      concerns = ['Kekeringan atau berminyak sesekali', 'Menjaga kesehatan kulit', 'Tanda-tanda penuaan dini'];
      recommendations = [
        'Pembersih lembut dengan pH seimbang',
        'Pelembap ringan dengan antioksidan',
        'Tabir surya harian (SPF 30+)',
        'Eksfoliasi 1-2 kali seminggu',
        'Serum antioksidan untuk pencegahan',
      ];
      break;
    case 'Kulit Sensitif':
      concerns = ['Kemerahan', 'Iritasi', 'Reaksi terhadap produk', 'Sensasi perih atau terbakar'];
      recommendations = [
        'Pembersih bebas pewangi dan lembut',
        'Pelembap menenangkan dengan ceramide dan centella asiatica',
        'Tabir surya fisik (zinc oxide/titanium dioxide)',
        'Hindari produk dengan alkohol, pewangi, dan minyak esensial',
        'Tes patch semua produk baru',
      ];
      break;
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
      concerns,
      recommendations,
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
    default:
      throw new Error(`Unsupported analysis type: ${analysisType}`);
  }
};