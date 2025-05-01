import { type Product } from './product.interface';
import { type QueryParams } from './query-params.interface';

export interface ProductListResponse extends QueryParams {
  products: Product[];
  total: number;
}
