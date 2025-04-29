import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product.service';

describe('ProductService', () => {
  let service: ProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
