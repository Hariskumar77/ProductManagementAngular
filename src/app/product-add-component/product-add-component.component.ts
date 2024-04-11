// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Product } from '../product.model';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-product-add-component',
//   templateUrl: './product-add-component.component.html',
//   styleUrls: ['./product-add-component.component.css']
// })
// export class ProductAddComponentComponent implements OnInit {

//   productForm: FormGroup;
//   product:Product[];
//   constructor(private fb: FormBuilder, private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       description: ['', Validators.required],
//       price: ['', Validators.required],
//       manufacturedDate: ['', Validators.required]
//     });
//   }

//   onSubmit() {

//     if (this.productForm.valid) {
//       const product = {
//         // productID:99,
//         productName: this.productForm.get('productName').value,
//         description: this.productForm.get('description').value,
//         price: this.productForm.get('price').value,
//         manufacturedDate: this.productForm.get('manufacturedDate').value
//       };

//       console.log(product);

//       this.productService.postProduct(product).subscribe(
//         (res: any) => {
//           console.log("New Product Created");
//           alert("Product Added");
//           this.productForm.reset(); // Reset the form after successful submission
//         },
//         (error: any) => {
//           console.error("Error:", error);
//           alert("Failed to add product. Please try again.");
//         }
//       );
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Product } from '../product.model';
// import { ProductService } from '../product.service';
// import { MatDialogRef } from '@angular/material/dialog';



// @Component({
//   selector: 'app-product-add-component',
//   templateUrl: './product-add-component.component.html',
//   styleUrls: ['./product-add-component.component.css']
// })
// export class ProductAddComponentComponent implements OnInit {

//   productForm: FormGroup;
//   product: Product[];
  

//   constructor(private fb: FormBuilder,
//      private productService: ProductService,
//      private dialogRef: MatDialogRef<ProductAddComponentComponent> // Inject MatDialogRef
// ) { }

//   ngOnInit(): void {
//     this.productForm = this.fb.group({
//       productName: ['', Validators.required],
//       description: ['', Validators.required],
//       price: ['', [Validators.required, priceValidator]], 
//       manufacturedDate: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.productForm.valid) {
//       const product = {
//         productName: this.productForm.get('productName').value,
//         description: this.productForm.get('description').value,
//         price: this.productForm.get('price').value,
//         manufacturedDate: this.productForm.get('manufacturedDate').value
//       };

//       this.productService.postProduct(product).subscribe(
//         (res: any) => {
//           console.log("New Product Created");
//           //alert("Product Added");
//           this.productService.announceProductAdded(); // Announce that a product has been added
//           this.productForm.reset(); // Reset the form after successful submission
//           this.dialogRef.close(); // Close the dialog

//         },
//         (error: any) => {
//           console.error("Error:", error);
//           alert("Failed to add product. Please try again.");
//         }
//       );
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';


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

  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
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
      // price: ['', [Validators.required]],
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
