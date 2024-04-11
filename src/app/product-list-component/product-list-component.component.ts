
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponentComponent } from '../product-add-component/product-add-component.component';
import { ProductDetailsComponentComponent } from '../product-details-component/product-details-component.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import * as xlsx from 'xlsx';
import html2pdf from 'html2pdf.js';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {

  product1: Product[] = [];
  
  @ViewChild('product',{ static: true }) product!: ElementRef;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.product1 = data;
      }
    );

    this.productService.productAdded$.subscribe(() => {
      this.productService.getAllProducts().subscribe(
        data => {
          this.product1 = data;
        }
      );
    });
  }

  //   viewProductDetails(productId: number) {
  //   console.log(productId);
  //   // this.router.navigate(['/product', productId]);
  //   // window.location.replace(`/product/${productId}`);
  // }

  openProductDetailsModal(product: Product) {
    this.dialog.open(ProductDetailsComponentComponent, {
      width: '600px',
      height:'500px',
      data: product,
    });
  }

  openAddProductDialog() {
    this.dialog.open(ProductAddComponentComponent, {
      width: '600px',
      height:'500px',
    });
  }
  generatePDF(){
    
    const element = this.product.nativeElement;
    const opt = {
      margin:       1,
      filename:     'table.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
 
    html2pdf().from(element).set(opt).save();
  }
  generateExcel(tableId: string, filename: string) {
   
    const element = document.getElementById(tableId);
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, filename + '.xlsx');
  }
  
}