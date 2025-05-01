import { Component, Input, type OnInit } from '@angular/core';

import { type Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  id?: number;
  product?: Product;

  private readonly route: ActivatedRoute;
  private readonly productService: ProductService;

  constructor(route: ActivatedRoute, productService: ProductService) {
    this.route = route;
    this.productService = productService;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id === undefined) return;

    this.productService
      .findById(this.id)
      .subscribe((product) => (this.product = product));
  }
}
