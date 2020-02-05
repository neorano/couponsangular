
import { RouterModule } from '@angular/router';
import { UserService } from './service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, FormBuilder } from '@angular/forms';
//import { CustomerComponent } from './customer/customer.component';
import { CouponsService } from './service/coupons.service';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component';
import { CustomerComponent } from './customer/customer.component';
import { MinPricePipe } from './pipes/min-price.pipe';
import { CustomerPurchasesComponent } from './customer/customer-purchases/customer-purchases.component';

@NgModule({
  declarations: [
      
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MenuComponent,
    CustomerComponent,
    AdminComponent,
    CompanyComponent,
    MinPricePipe,
    CustomerPurchasesComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [UserService,FormBuilder
  , CouponsService , HeaderComponent
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
