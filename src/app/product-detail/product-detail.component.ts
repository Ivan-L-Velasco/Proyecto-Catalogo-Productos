import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService, Product } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productApiService: ProductApiService) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productApiService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.product = products.find(product => product.id === productId);
      },
      error: error => {
        console.error('Error al obtener producto:', error);
      }
    });
  }
}
