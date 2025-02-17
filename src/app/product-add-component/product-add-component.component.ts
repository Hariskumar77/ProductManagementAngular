import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialogRef } from '@angular/material/dialog';

function priceValidator(control) {
  const price = parseFloat(control.value);
  if (isNaN(price) || price <= 0) {
    return { 'invalidPrice': true };
  }
  return null;
}

@Component({
  selector: 'app-product-add-component',
  templateUrl: './product-add-component.component.html',
  styleUrls: ['./product-add-component.component.css'],
})
export class ProductAddComponentComponent implements OnInit {
  productForm: FormGroup;
  product: Product[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductAddComponentComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, priceValidator]], 
      manufacturedDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = {
        productName: this.productForm.get('productName').value,
        description: this.productForm.get('description').value,
        price: parseFloat(this.productForm.get('price').value),
        manufacturedDate: this.productForm.get('manufacturedDate').value
      };

      this.productService.postProduct(product).subscribe(
        (res: any) => {
          console.log("New Product Created");
          this.productService.announceProductAdded();
          this.productForm.reset();
          this.dialogRef.close();
        },
        (error: any) => {
          console.error("Error:", error);
          alert("Failed to add product. Please try again.");
        }
      );
    }
  }

  checkNegativePrice(price: string) {
    const parsedPrice = parseFloat(price);
    if (parsedPrice < 0) {
      alert("Price cannot be Negative"); // Alert message for negative price
    }
  }
}
