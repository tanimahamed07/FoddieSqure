export interface TMenu {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  ingredients: string[]; // যুক্ত করা হয়েছে
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isSpecial: boolean;
  preparationTime: string;
  nutrition: {           // যুক্ত করা হয়েছে
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
}