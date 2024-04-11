import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponentComponent } from './product-details-component/product-details-component.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';


const routes: Routes = [
  { path: '', component: ProductListComponentComponent },
  { path: 'product/:id', component: ProductDetailsComponentComponent} // Route with parameter
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
