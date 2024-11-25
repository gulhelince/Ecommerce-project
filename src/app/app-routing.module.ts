import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

const routes: Routes = [
  {path:'',component:ProductViewComponent},
  {path:'product-detail/:productid',component:ProductDetailComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'order-page',component:OrderPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
