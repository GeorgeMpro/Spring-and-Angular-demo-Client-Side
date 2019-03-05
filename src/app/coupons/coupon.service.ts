import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Coupon} from './coupon.model';

@Injectable({
    providedIn: 'root'
})
export class CouponService {
    // todo change to private methods
    // todo extract to common CRUD service

    private baseUrl = 'http://localhost:8080/coupons/';
    couponsUpdate = new Subject<Array<Coupon>>();

    constructor(private http: HttpClient) {
        this.getAll().subscribe(
            data => {
                this.couponsUpdate.next(data);
            },
            error => {
                console.log(error);
                //    todo handle error
            }
        );
    }


    updateCouponListValues() {
        this.getAll().subscribe(
            data => {
                this.couponsUpdate.next(data);
            },
            error => {
                console.log(error);
                //    todo handle error
            }
        );
    }

    createCoupon(coupon: Coupon) {
        // todo
        return this.http.post(this.baseUrl, coupon)
            .pipe(map(
                response => {
                    // todo del
                    console.log(response);
                }),
                catchError(error => {
                    // todo cleanup - pass to error handling method
                    console.log(error);

                    return throwError(error);
                }));
    }


    updateCoupon(coupon: Coupon) {
        return this.http.put(this.baseUrl, coupon)
            .pipe(map(
                response => {
                    console.log('put response');
                    // todo del
                    console.log(response);
                },
                catchError(error => {
                    // todo cleanup - pass to error handling method
                    console.log(error);

                    return throwError(error);
                })));
    }

    private getAll(): Observable<any> {
        return this.http.get(this.baseUrl)
            .pipe(
                map((response: Response) => response),
                catchError(error => {
                    // todo cleanup - pass to error handling method
                    console.log(error);

                    return throwError(error);
                }));
    }

    getById(id: number): Observable<any> {
        // todo add functionality - move to update app
        const byIdPath = this.baseUrl + id + '/id';
        return this.http.get(byIdPath)
            .pipe(
                map((response: Response) => response),
                catchError(error => {
                    console.log(error);
                    const errorMessage = error.error.exception;
                    // todo cleanup - pass to error handling method

                    return throwError(errorMessage);
                }));
    }

    delete(id: number) {
        // todo update display message
        const confirmMessage = 'Are you sure you want to delete coupon with id value ' + id + '?';
        const byIdPath = this.baseUrl + id + '/id';

        if (confirm(confirmMessage)) {
            return this.http.delete(byIdPath);
        }
        return of('canceled delete');
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
