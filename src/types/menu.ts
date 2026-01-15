export interface TMenu {
  id?: string;
  name: string;
  image: string;      // 👈 এই লাইনটি অবশ্যই যোগ করতে হবে
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