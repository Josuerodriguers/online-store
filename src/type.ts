export type CategoryType = {
  id: string;
  name: string;
};

export type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
  shipping: { free_shipping: boolean };
  available_quantity: number;
};

export type ReviewType = {
  email: string;
  rating: string;
  message: string;
};

type ObjectType = {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string
};

export type ProductTypeWithPicture = ProductType & { pictures: ObjectType[] };

export type ProductTypeWithQuantity = ProductType & { quantity: number };
