
import React from 'react';
import { Product, StockStatus, Category } from './types';

export const SHIPPING_RATES = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
};

export const CATEGORIES: Category[] = [
  { 
    id: 'skincare', 
    name: 'Skincare', 
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&h=400&fit=crop',
    subCategories: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen']
  },
  { 
    id: 'makeup', 
    name: 'Makeup', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&h=400&fit=crop',
    subCategories: ['Face', 'Eyes', 'Lips', 'Brushes']
  },
  { 
    id: 'fragrance', 
    name: 'Fragrance', 
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&h=400&fit=crop',
    subCategories: ['Men', 'Women', 'Unisex']
  },
  { 
    id: 'haircare', 
    name: 'Haircare', 
    image: 'https://images.unsplash.com/photo-1527799822367-474857a3f447?q=80&w=400&h=400&fit=crop',
    subCategories: ['Shampoo', 'Conditioner', 'Styling']
  },
];

export const BRANDS = ['The Ordinary', 'CeraVe', 'MAC', 'Fenty Beauty', 'Laneige', 'Neutrogena'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    shortDescription: 'High-strength vitamin and mineral blemish formula.',
    description: 'Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity.',
    category: 'skincare',
    subCategory: 'Serums',
    brand: 'The Ordinary',
    sku: 'TO-NZ-01',
    price: 950,
    salePrice: 850,
    stockCount: 50,
    stockStatus: StockStatus.IN_STOCK,
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&h=800&fit=crop'
    ],
    variations: [
      { id: 'v1', name: 'Size', options: ['30ml', '60ml'] }
    ],
    specifications: {
      'Skin Type': 'All types',
      'Concerns': 'Blemishes, Sebum'
    },
    rating: 4.8,
    reviews: [],
    isFeatured: true
  },
  {
    id: '2',
    name: 'CeraVe Hydrating Facial Cleanser',
    shortDescription: 'Daily face wash with hyaluronic acid, ceramides and glycerin.',
    description: 'CeraVe Hydrating Facial Cleanser is a gentle face wash with ingredients like ceramides and hyaluronic acid that work to restore the skins natural barrier to help the skin lock in moisture.',
    category: 'skincare',
    subCategory: 'Cleansers',
    brand: 'CeraVe',
    sku: 'CV-HC-01',
    price: 1450,
    stockCount: 20,
    stockStatus: StockStatus.IN_STOCK,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&h=800&fit=crop'
    ],
    variations: [
      { id: 'v2', name: 'Size', options: ['236ml', '473ml'] }
    ],
    specifications: {
      'Skin Type': 'Normal to Dry',
      'Texture': 'Creamy'
    },
    rating: 4.9,
    reviews: [],
    isFeatured: true
  },
  {
    id: '3',
    name: 'MAC Matte Lipstick - Ruby Woo',
    shortDescription: 'The iconic product that made M·A·C famous.',
    description: 'Ruby Woo is a very bright, cool-toned red with a matte finish. It is the perfect red for almost any skin tone.',
    category: 'makeup',
    subCategory: 'Lips',
    brand: 'MAC',
    sku: 'MAC-RW-01',
    price: 2200,
    salePrice: 1950,
    stockCount: 15,
    stockStatus: StockStatus.IN_STOCK,
    images: [
      'https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=600&h=800&fit=crop'
    ],
    variations: [
      { id: 'v3', name: 'Shade', options: ['Ruby Woo', 'Velvet Teddy', 'Chili'] }
    ],
    specifications: {
      'Finish': 'Matte',
      'Long-wearing': 'Yes'
    },
    rating: 4.7,
    reviews: [],
    isFeatured: false
  },
  {
    id: '4',
    name: 'Laneige Lip Sleeping Mask',
    shortDescription: 'Leave-on lip mask that soothes and moisturizes.',
    description: 'A leave-on lip mask that soothes and moisturizes for smoother, more supple lips overnight. Vitamin C-rich Berry Mix Complex™, containing raspberry, strawberry, cranberry, and blueberry extracts, erases dry, flaky dead skin on the lips during the night.',
    category: 'skincare',
    subCategory: 'Lips',
    brand: 'Laneige',
    sku: 'LN-LM-01',
    price: 1850,
    stockCount: 5,
    stockStatus: StockStatus.PRE_ORDER,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&h=800&fit=crop'
    ],
    variations: [
      { id: 'v4', name: 'Flavor', options: ['Berry', 'Grapefruit', 'Vanilla'] }
    ],
    specifications: {
      'Skin Concern': 'Dryness',
      'Usage': 'Overnight'
    },
    rating: 4.9,
    reviews: [],
    isFeatured: true
  }
];
