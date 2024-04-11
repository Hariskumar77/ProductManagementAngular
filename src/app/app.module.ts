import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductAddComponentComponent } from './product-add-component/product-add-component.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponentComponent,
    ProductListComponentComponent,
    ProductDetailsComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Add AppRoutingModule to imports array
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [ProductService],
  entryComponents: [ProductAddComponentComponent], 
  bootstrap: [AppComponent]
})
export class AppModule { }
