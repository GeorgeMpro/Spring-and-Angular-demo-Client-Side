import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customers/customer-component/customer.component';
import {CompanyComponent} from './companies/company/company.component';
import {CouponsComponent} from './coupons/coupons.component';
import {HomeComponent} from './home/home.component';
import {CouponComponent} from './coupons/coupon/coupon.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CouponEditComponent} from './coupons/coupon-edit/coupon-edit.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        CustomerComponent,
        CompanyComponent,
        CouponsComponent,
        CouponComponent,
        HomeComponent,
        PageNotFoundComponent,
        CouponEditComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
