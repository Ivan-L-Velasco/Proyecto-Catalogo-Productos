import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


// Interfaz para los productos
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private apiUrl = 'https://fakestoreapi.com/products'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener productos con imágenes optimizadas
  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<Product[]>(this.apiUrl, { headers }).pipe(
      map(products => products.map(product => ({
        ...product,
        image: this.convertToWebP(product.image) // Convertir imagen a WebP
      })))
    );
  }

  // Método para convertir imágenes a WebP
  public convertToWebP(imageUrl: string): string {
    if (imageUrl.includes('.webp')) {
      return imageUrl; // Mantener si ya es WebP
    }
    return imageUrl; // Si es JPG/PNG, usarla sin modificar
  }
}

