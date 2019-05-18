import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends DataService {
    // todo inject general CRUD service
    // todo add company[] subject

    constructor(http: HttpClient) {
        super('http://localhost:8080/companies/', http);
    }
}