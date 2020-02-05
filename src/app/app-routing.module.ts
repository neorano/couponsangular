import { CustomerComponent } from './customer/customer.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { LoginActivateGuard } from './login-activate.guard';
import { CustomerPurchasesComponent } from './customer/customer-purchases/customer-purchases.component';


const routes: Routes = [
  { path: "home", component: MainComponent },
    // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
    // { path: "users", canActivate: [LoginGuardService], component: UsersComponent },
    // { path: "add-user", canActivate: [LoginGuardService], component: AddUserComponent },
    // { path: "about", component: AboutComponent },
    // { path: "contact-us", component: ContactUsComponent },
    { path: "purchases", component: CustomerPurchasesComponent , canActivate:[LoginActivateGuard] },
    { path: "customer", component: CustomerComponent , canActivate:[LoginActivateGuard] },
    { path: "admin", component: AdminComponent , canActivate:[LoginActivateGuard] },
    { path: "company", component: CompanyComponent , canActivate:[LoginActivateGuard] },
    // { path: "login", component: LoginComponent },
    { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

