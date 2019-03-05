import {Coupon} from '../coupons/coupon.model';

export class Customer {
    public id: number;
    public name: string;
    public email: string;
    public coupons: Array<Coupon>;


    constructor(id: number, name: string, email: string, coupons: Array<any>) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.coupons = coupons;
    }
}
