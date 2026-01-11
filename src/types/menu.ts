export interface TMenu {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isSpecial: boolean;
  preparationTime: string;
}
