import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Coupon} from '../coupon.model';
import {CouponService} from '../../services/coupon.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit, OnDestroy {

    coupon: Coupon;
    // todo(?) add owning company field
    private idRoute: number;
    private paramsSubscription: Subscription;
    private couponSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: CouponService) {
    }

    ngOnInit() {

        this.idRoute = this.route.snapshot.params['id'];
        this.paramsSubscription = this.route.params
            .subscribe(
                (params: Params) => {
                    this.idRoute = params['id'];
                    this.setupCoupon(this.idRoute);
                },
                error => {
                    // todo (?) handle format error
                    console.log(error);
                }
            );
    }


    private setupCoupon(id: number) {
        this.couponSubscription = this.service.getById(id).subscribe(
            data => {
                this.coupon = this.service.setupDataToCouponValues(data);
            },
            error => {
                // todo exception/error handling
                console.log(error);
            }
        );
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
        this.couponSubscription.unsubscribe();
    }

    onUpdate() {
        this.router.navigate(['/coupons/', this.idRoute, 'edit']);
    }

    onDelete(id: number) {
        // todo reload the coupon list
        this.service.deleteById(id).subscribe(
            // todo
            response => {
                console.log(response);
                this.service.updateCouponListValues();
                this.router.navigate(['/coupons']);
            },
            error => {
                // todo handle error on cancel
                console.log(error);
            }
        );
    }
}
