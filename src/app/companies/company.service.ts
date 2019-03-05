import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    // todo update functionality
    // todo inject general CRUD service
    // todo add company[] subject
    private baseUrl = 'http://localhost:8080/companies/';

    constructor(private http: HttpClient) {
    }


    // todo update
    getAll(): Observable<any> {
        return this.http.get(this.baseUrl)
            .pipe(
                map((response: Response) => response)
            );
    }

    // todo
    getById(id: number) {
        return this.http.get(this.baseUrl + id + '/id');
    }

    // todo
    deleteCompany(id: number) {

        if (confirm('Are you sure you want to delete the company?')) {
            // todo(?) use ng-bootstrap
            // return this.http.delete(this.baseUrl + id + '/id');
            console.log('deleted!');
        }

        // todo update message
        return of('canceled');
    }
}
