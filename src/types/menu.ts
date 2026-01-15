export interface TMenu {
  _id?: any;
  id?: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isSpecial: boolean;
  preparationTime: string;
  nutrition: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
}
