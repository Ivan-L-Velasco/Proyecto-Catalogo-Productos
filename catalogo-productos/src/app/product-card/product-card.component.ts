import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addProduct = new EventEmitter<string>();

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(event: Event) {
    event.stopPropagation(); // Detener la propagación del evento click
    this.cartService.addToCart(this.product);
    this.addProduct.emit(this.product.title); // Usar 'title' en lugar de 'name'
    console.log(`${this.product.title} agregado al carrito`); // Usar 'title' en lugar de 'name'
  }

  viewProductDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}


