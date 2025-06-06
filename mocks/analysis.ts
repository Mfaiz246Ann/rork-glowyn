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
    },
  },
  {
    id: 'analysis2',
    type: 'face',
    title: 'Heart Shape',
    date: 'May 10, 2025',
    result: 'Heart Shape',
    details: {
      recommendations: [
        'Side-swept bangs to soften your forehead',
        'Medium to long layered cuts',
        'Chin-length bobs that add width to the lower part of your face',
        'Cat-eye or oval shaped glasses',
        'Drop earrings that widen the jaw area',
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
      concerns: ['T-zone oiliness', 'Occasional dryness on cheeks'],
      recommendations: [
        'Gentle foaming cleanser',
        'Oil-free moisturizer',
        'Weekly clay mask for T-zone',
        'Hydrating serum with hyaluronic acid',
      ],
    },
  },
];