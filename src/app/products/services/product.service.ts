import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { type ProductListResponse } from '../interfaces/product-list-response';
import { type Product } from '../interfaces/product.interface';
import { type QueryParams } from '../interfaces/query-params.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl: string;
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/products';
    this.httpClient = httpClient;
  }

  findAll(queryParams?: QueryParams): Observable<Product[]> {
    return this.httpClient
      .get<ProductListResponse>(this.apiUrl, {
        params: this.getParams(queryParams),
      })
      .pipe(map((result) => result.products));
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  findByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.apiUrl}/category/${category}`,
    );
  }

  findByName(q: string): Observable<Product[]> {
    return this.httpClient
      .get<ProductListResponse>(`${this.apiUrl}/search`, {
        params: { ...this.getParams(), q },
      })
      .pipe(map((result) => result.products));
  }

  private getParams(queryParams?: QueryParams): HttpParams {
    const { skip, limit, sortBy, order } = queryParams ?? {};
    return new HttpParams()
      .set('skip', skip ?? 0)
      .set('limit', limit ?? 12)
      .set('sortBy', sortBy ?? 'id')
      .set('order', order ?? 'asc');
  }
}
