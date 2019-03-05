import {Coupon} from '../coupons/coupon.model';

export class Company {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public coupons: Array<Coupon>;


    constructor(id: number, name: string, email: string, password: string, coupons: Array<any>) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}
