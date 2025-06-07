import { AnalysisResult } from '@/types';

export const recentAnalysis: AnalysisResult[] = [
  {
    id: 'analysis1',
    type: 'color',
    title: 'Spring Warm',
    date: 'May 12, 2025',
    result: 'Spring Warm',
    details: {
      palette: [
        { name: 'Coral', hex: '#FF7F50' },
        { name: 'Peach', hex: '#FFDAB9' },
        { name: 'Warm Yellow', hex: '#FFD700' },
        { name: 'Sage Green', hex: '#BCB88A' },
        { name: 'Turquoise', hex: '#40E0D0' },
      ],
      description: 'Your colors are warm and bright, perfect for bringing out the natural glow in your complexion.',
      confidence: 87,
      perfectColors: ['#FF7F50', '#FFDAB9', '#FFD700', '#BCB88A', '#40E0D0'],
      goodColors: ['#FFA07A', '#FFE4B5', '#FFFFE0', '#98FB98', '#AFEEEE'],
      sparinglyColors: ['#800000', '#000080', '#4B0082', '#2F4F4F', '#000000'],
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
  },
  {
    id: 'analysis2',
    type: 'face',
    title: 'Heart Shape',
    date: 'May 10, 2025',
    result: 'Heart Shape',
    details: {
      confidence: 86,
      features: {
        faceLength: 'Panjang wajah lebih dari lebar wajah',
        cheekbones: 'Tulang pipi tinggi dan lebar',
        jawline: 'Rahang meruncing ke arah dagu',
        forehead: 'Dahi lebar, titik terlebar pada wajah',
        chinShape: 'Dagu sempit dan meruncing',
      },
      hairstyles: [
        { name: 'Rambut medium dengan lapisan', rating: 'Perfect', description: 'Menyeimbangkan dahi lebar' },
        { name: 'Poni', rating: 'Excellent', description: 'Mengurangi lebar dahi' },
        { name: 'Potongan bob', rating: 'Great', description: 'Menambah lebar di bagian bawah wajah' },
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
  },
  {
    id: 'analysis3',
    type: 'skin',
    title: 'Combination Skin',
    date: 'May 5, 2025',
    result: 'Combination Skin',
    details: {
      confidence: 89,
      concerns: ['T-zone oiliness', 'Occasional dryness on cheeks'],
      recommendations: [
        {
          category: 'Cleanser',
          products: ['Gentle foaming cleanser', 'pH-balanced cleanser', 'Micellar water for light cleansing']
        },
        {
          category: 'Moisturizer',
          products: ['Light balancing moisturizer', 'Gel-cream hybrid', 'Hydrating serum with hyaluronic acid']
        },
        {
          category: 'Treatment',
          products: ['Weekly clay mask for T-zone', 'Hydrating mask for cheeks', 'Gentle exfoliation 1-2 times weekly']
        },
        {
          category: 'Protection',
          products: ['Oil-free sunscreen for T-zone', 'Cream-based sunscreen for cheeks', 'Balancing primer']
        }
      ],
    },
  },
  {
    id: 'analysis4',
    type: 'outfit',
    title: 'Minimalist Style',
    date: 'May 3, 2025',
    result: 'Minimalist Style for Hourglass Body Type',
    details: {
      stylePreference: 'Minimalist',
      bodyType: 'Hourglass',
      occasion: 'Casual',
      weather: 'Warm',
      recommendations: [
        {
          title: 'Minimalist Chic',
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
          title: 'Casual Minimalist',
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
  },
];