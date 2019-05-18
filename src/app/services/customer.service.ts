import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends DataService {
    // todo add customer[] subject
    constructor(http: HttpClient) {
        super('http://localhost:8080/customers/', http);
    }
}
