import { Product, Collection } from '@/types';

export const featuredProducts: Product[] = [
  {
    id: 'product1',
    name: 'Lipstik Satin',
    brand: 'Glowyn Beauty',
    category: 'makeup',
    price: 189000,
    currency: 'IDR',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Lipstik creamy tahan lama dengan hasil satin.',
    rating: 4.8,
    isWishlisted: true,
  },
  {
    id: 'product2',
    name: 'Hoodie Kasual',
    brand: 'Urban Style',
    category: 'fashion',
    price: 349000,
    currency: 'IDR',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Hoodie katun nyaman untuk pemakaian sehari-hari.',
    rating: 4.5,
    isWishlisted: false,
  },
  {
    id: 'product3',
    name: 'Masker Wajah Hidrasi',
    brand: 'Skin Essentials',
    category: 'skincare',
    price: 129000,
    currency: 'IDR',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sheet mask dengan hidrasi mendalam mengandung asam hialuronat.',
    rating: 4.7,
    isWishlisted: false,
  },
  {
    id: 'product4',
    name: 'Anting Tassel',
    brand: 'Boho Chic',
    category: 'accessories',
    price: 99000,
    currency: 'IDR',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Anting tassel buatan tangan dengan warna biru cerah.',
    rating: 4.6,
    isWishlisted: true,
  },
];

export const collections: Collection[] = [
  {
    id: 'collection1',
    name: 'Koleksi Musim Panas',
    description: 'Pakaian ringan dan breathable untuk cuaca panas.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    subtitle: 'Elegan',
    isEditorsPick: true,
  },
  {
    id: 'collection2',
    name: 'Essentials Harian',
    description: 'Produk skincare wajib untuk rutinitas harianmu.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    subtitle: 'Skincare',
    isEditorsPick: false,
  },
];

export const categories = [
  {
    id: 'category1',
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'category2',
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'category3',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];