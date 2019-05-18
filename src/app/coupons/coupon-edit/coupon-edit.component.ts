import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

import {CouponService} from '../../services/coupon.service';
import {Coupon} from '../coupon.model';
import {AppError} from '../../errors/app-error';
import {BadInput} from '../../errors/bad-input';
import {NotFoundError} from '../../errors/not-found-error';

@Component({
    selector: 'app-coupon-edit',
    templateUrl: './coupon-edit.component.html',
    styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit, OnDestroy {
    private editMode = false;
    private couponForm: FormGroup;
    private couponSubscription: Subscription;
    private id: number;


    constructor(private service: CouponService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.couponSubscription = this.route.params
            .subscribe((params: Params) => {
                // todo(?) check for id format error
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initializeForm();
            });
    }

    ngOnDestroy(): void {
        this.couponSubscription.unsubscribe();
    }


    private initializeForm() {
        this.setupCreateCouponForm();

        if (this.editMode) {
            this.setupUpdateForm();
        }
    }

    private setupCreateCouponForm() {
        const pipe = new DatePipe('en-US');
        const today = pipe.transform(new Date(), 'yyyy-MM-dd');
// todo test validation

        // todo validate amount when added
        this.couponForm = new FormGroup({
            'name': new FormControl('', Validators.required),
            'amount': new FormControl(0, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
            'description': new FormControl(''),
            'imageLocation': new FormControl(''),
            'startDate': new FormControl(today, []),
            'endDate': new FormControl(today, [])
        });
    }

    private setupUpdateForm() {
        this.service.getById(this.id).subscribe(
            data => {
                this.setupUpdateCouponFormValues(data);
            },
            (error: AppError) => this.passErrorToUser(error));
    }

    private setupUpdateCouponFormValues(data: any) {
        const coupon: Coupon = data;
        this.couponForm.setValue({
            name: coupon.name,
            amount: coupon.amount,
            description: coupon.description,
            imageLocation: coupon.imageLocation,
            startDate: coupon.startDate,
            endDate: coupon.endDate
        });
    }

    onCancel() {
        this.couponForm.reset();
        this.editMode = false;
        this.router.navigate(['../'], {relativeTo: this.route});
    }


    onSubmit() {
        const coupon = this.couponForm.value;
        if (this.editMode) {
            this.updateCoupon(coupon);
        } else {
            this.create(coupon);
        }
        // todo add success message for client

        // removes all data on update
        this.couponForm.reset();
    }

    private updateCoupon(coupon: Coupon) {
        coupon.id = this.id;

        this.service.update(coupon).subscribe(
            () => {
                this.service.updateCouponListValues();
            },
            (error: AppError) => this.passErrorToUser(error));

        // todo(?) move back
        // todo does not update the updated coupon
        this.router.navigate(['../../'], {relativeTo: this.route});
    }

    private create(coupon: Coupon) {
        this.service.create(coupon).subscribe(
            response => {
                // todo del
                console.log(response);

                this.service.updateCouponListValues();
                this.router.navigate(['/coupons']);
            },
            (error: AppError) => this.passErrorToUser(error));
    }

    // todo(?) extract to coupon service
    // todo change alert to toast notification
    private passErrorToUser(error: AppError) {

        const errorMessage = error.getErrorMessageForUserDisplay();

        if (error instanceof BadInput) {
            // todo set error to form
            // todo show the user the error
            // this.couponForm.setErrors(error.originalError);
            console.log(error);
            alert(errorMessage);
        } else if (error instanceof NotFoundError) {
            //     todo
            console.log(error);
            alert(errorMessage);
        } else {
            // todo
            console.log(error);
            throw error;
        }
    }
}

