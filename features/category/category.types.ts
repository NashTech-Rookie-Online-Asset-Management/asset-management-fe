export type Category = {
  id: number;
  name: string;
  prefix: string;
};

export type CreateCategoryRequest = Omit<Category, 'id'>;

export type UpdateCategoryRequest = Partial<Category>;
