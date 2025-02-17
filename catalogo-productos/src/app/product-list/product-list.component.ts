import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductApiService, Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    ProductCardComponent
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  searchQuery: string = '';
  errorMessage: string = '';
  cartItems: string[] = [];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };

  constructor(private productApiService: ProductApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productApiService.getProducts().subscribe({
      next: (data: Product[]) => {
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = [...this.products]; // Inicializamos con todos los productos
          this.pageEvent.length = this.filteredProducts.length;
          this.paginateProducts();
        } else {
          console.error('La respuesta de la API no es un array:', data);
          this.snackBar.open('Error al obtener productos. Por favor, inténtelo de nuevo más tarde.', 'Cerrar', {
            duration: 5000,
          });
        }
      },
      error: error => {
        console.error('Error al obtener productos:', error);
        this.snackBar.open('Error al obtener productos. Por favor, inténtelo de nuevo más tarde.', 'Cerrar', {
          duration: 5000,
        });
      }
    });
  }

  filterProducts() {
    const invalidChars = /[^a-zA-Z0-9\s]/;
    if (invalidChars.test(this.searchQuery)) {
      this.errorMessage = 'Entrada no válida: solo se permiten letras, números y espacios.';
      return;
    } else {
      this.errorMessage = ''; // Limpiamos el mensaje de error si la entrada es válida
    }

    if (this.searchQuery.trim().length > 0) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }

    this.pageEvent.length = this.filteredProducts.length;
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    const endIndex = startIndex + this.pageEvent.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageEvent = event;
    this.paginateProducts();
  }

  handleAddProduct(productName: string) {
    this.cartItems.push(productName);
    console.log(`Carrito actualizado: ${this.cartItems}`);
  }
}

