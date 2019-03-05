import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {CompanyComponent} from './companies/company/company.component';
import {CustomerComponent} from './customers/customer-component/customer.component';
import {CouponsComponent} from './coupons/coupons.component';
import {CouponEditComponent} from './coupons/coupon-edit/coupon-edit.component';
import {CouponComponent} from './coupons/coupon/coupon.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'companies', component: CompanyComponent},
    {path: 'customers', component: CustomerComponent},
    {
        path: 'coupons', component: CouponsComponent, children: [
            {path: 'new', component: CouponEditComponent},
            {path: ':id', component: CouponComponent},
            {path: ':id/edit', component: CouponEditComponent}
        ]
    },
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
