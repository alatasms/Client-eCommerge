import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
//child rotaları burada nihai hale getirip buraya route olarak ekleyeceğiz.
const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [ //LayoutComponent'in alt componentlerini burada bildiriyoruz.
      { path: "", component: DashboardComponent,canActivate:[AuthGuard] },//admin'den sonra herhangi bir şey yazılmaz ise DashboardComponentine yönlendirecek.
      { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule),canActivate:[AuthGuard] },//wwww....addfs.com/admin/customers gelir ise bu module yönlendir.
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule),canActivate:[AuthGuard] },
      { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => module.OrderModule),canActivate:[AuthGuard] }//admin sonrası orders gelirse ilgili modul çağrılarak o modul çindeki route kurallarına göre devam edecektir.
    ],canActivate:[AuthGuard]
  },
  { path: "", component: HomeComponent },
  { path: "baskets", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule) },
  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
  { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then(module => module.UpdatePasswordModule) },
  { path: "confirm-email/:userId/:confirmationToken", loadChildren: () => import("./ui/components/confirm-email/confirm-email.module").then(module => module.ConfirmEmailModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
