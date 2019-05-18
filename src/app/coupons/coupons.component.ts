import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CouponService} from '../services/coupon.service';
import {Coupon} from './coupon.model';
import {Subscription} from 'rxjs';
import {AppError} from '../errors/app-error';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupons.component.html',
    styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy {

    coupons: Array<Coupon>;
    private subscription: Subscription;

    constructor(private service: CouponService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.service.updateCouponListValues();
        this.subscription = this.service.couponsUpdate.subscribe(
            (data => this.coupons = data)
            ,
            // todo test that it toasts message
            (error: AppError) => {
                throw error;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSelect(id: any) {
        this.router.navigate(['/coupons/', id]);
    }

    create() {
        this.router.navigate(['new'], {relativeTo: this.route});

    }

}
