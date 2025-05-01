import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { type Product } from '../../interfaces/product.interface';
import { type QueryParams } from '../../interfaces/query-params.interface';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  title = 'mis productos';
  name = '';

  products: Product[];
  queryParams: QueryParams;

  private readonly productService: ProductService;
  private readonly route: ActivatedRoute;
  private readonly router: Router;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    router: Router,
  ) {
    this.productService = productService;
    this.route = route;
    this.router = router;

    this.products = [];
    this.queryParams = {
      skip: 0,
      limit: 12,
      sortBy: 'id',
      order: 'asc',
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = {
        skip: +params['skip'] || 0,
        limit: +params['limit'] || 12,
        sortBy: params['sortBy'] || 'id',
        order: params['order'] || 'asc',
      };
      this.loadProducts();
    });
  }

  get currentPage(): number | undefined {
    const skip = this.queryParams?.skip;
    const limit = this.queryParams?.limit;

    if (skip != null && limit != null && limit > 0)
      return Math.floor(skip / limit) + 1;

    return undefined;
  }

  loadProducts(): void {
    this.productService
      .findAll(this.queryParams)
      .subscribe((data) => (this.products = data));
  }

  loadProductsByName(): void {
    this.productService.findByName(this.name).subscribe((data) => {
      this.products = data;
      this.queryParams.skip = 0;
      this.router.navigate([], {
        queryParams: { ...this.queryParams, skip: 0 },
        queryParamsHandling: 'merge',
      });
    });
  }

  next(): void {
    const newSkip = this.queryParams.skip! + this.queryParams.limit!;
    this.router.navigate([], {
      queryParams: { ...this.queryParams, skip: newSkip },
      queryParamsHandling: 'merge',
    });
  }

  previous(): void {
    const newSkip = Math.max(
      this.queryParams.skip! - this.queryParams.limit!,
      0,
    );
    this.router.navigate([], {
      queryParams: { ...this.queryParams, skip: newSkip },
      queryParamsHandling: 'merge',
    });
  }
}
