import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Coupon} from '../coupons/coupon.model';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CouponService extends DataService {
    couponsUpdate = new Subject<Array<Coupon>>();

    constructor(http: HttpClient) {
        super('http://localhost:8080/coupons/', http);
    }


    updateCouponListValues() {
        this.getAll().subscribe(
            (data: Response | any) => {
                // todo(?) parse the data and assign key-value pairs
                const coupons: Coupon[] = data;
                this.couponsUpdate.next(coupons);
            },
            (error: Response) => {
                //    todo handle error
                console.log(error);
                alert(error);
            }
        );
    }

    setupDataToCouponValues(data: any) {
        // todo(?) check for errors
        data = {
            id: data.id,
            name: data.name,
            amount: data.amount,
            description: data.description,
            imageLocation: data.imageLocation,
            startDate: data.startDate,
            endDate: data.endDate,
            customers: data.customers
        };
        return data;
    }
}
