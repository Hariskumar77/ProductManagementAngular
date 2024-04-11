// import { Component, OnInit } from '@angular/core';
// import { Product } from '../product.model';
// import { ProductService } from '../product.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-product-details-component',
//   templateUrl: './product-details-component.component.html',
//   styleUrls: ['./product-details-component.component.css']
// })
// export class ProductDetailsComponentComponent implements OnInit {
//   product: Product;
//   productId: number;

//   constructor(private productService: ProductService, private route: ActivatedRoute) { }

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       console.log("Product ID1:",params['id'] );

//       this.productId = +params['id']; // Convert the parameter to a number
//       console.log("Product ID:", this.productId);
//       this.productService.getProductById(this.productId).subscribe(
//         data => {
//           this.product = data;
//           console.log(this.product);
//         }
//       );
//     });
//   }
// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-details-component',
  templateUrl: './product-details-component.component.html',
  styleUrls: ['./product-details-component.component.css']
})
export class ProductDetailsComponentComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) { }

}

