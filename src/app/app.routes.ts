import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  {
    path: 'productos',
    loadComponent: () =>
      import('./products/components/product-list/product-list.component').then(
        (c) => c.ProductListComponent,
      ),
  },
  {
    path: 'productos/:id',
    loadComponent: () =>
      import(
        './products/components/product-detail/product-detail.component'
      ).then((c) => c.ProductDetailComponent),
  },
];
