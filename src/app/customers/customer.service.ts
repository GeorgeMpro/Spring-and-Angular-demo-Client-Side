import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    // todo update functionality
    // todo inject general CRUD service
    // todo add customer[] subject
    constructor(private http: HttpClient) {
    }

    private baseUrl = 'http://localhost:8080/customers/';

    // todo change to private and subject.next
    getAll(): Observable<any> {
        return this.http.get(this.baseUrl)
            .pipe(
                map((response: Response) => response)
            );
    }

    getById(id: number) {
        // todo add functionality
        return this.http.get(this.baseUrl + id + '/id');
    }

    deleteCustomer(id: number) {
        // todo dummy - use real implementation
        if (confirm('Are you sure you want to delete the customer?')) {
            // todo(?) use ng-bootstrap
            // return this.http.delete(this.baseUrl + id + '/id');
            console.log('deleted!');
        }
        // todo update message
        return of('canceled');
    }
}
