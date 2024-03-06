import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CashPayComponent } from './components/cash-pay/cash-pay.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'HOME' },
      { path: 'details/:id', component: DetailsComponent, title: 'DETAILS' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'CHECKOUT' },
      { path: 'cashPay/:id', component: CashPayComponent, title: 'CASH PAY' },
      { path: 'cart', component: CartComponent, title: 'CART' },
      { path: 'allorders', component: AllordersComponent, title: 'ALL ORDERS' },
      { path: 'brands', component: BrandsComponent, title: 'BRANDS' },
      { path: 'products', component: ProductsComponent, title: 'PRODUCTS' },
      { path: 'wishList', component: WishListComponent, title: 'WISH LIST' },
      {
        path: 'forgetPassword',
        component: ForgetPassComponent,
        title: 'FORGET PASSWORD',
      },

      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'CATEGORIES',
      },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'LOGIN' },
      { path: 'register', component: RegisterComponent, title: 'REGISTER' },
      {
        path: 'forgetPassword',
        component: ForgetPassComponent,
        title: 'FORGET PASSWORD',
      },
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'NOT FOUND' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
