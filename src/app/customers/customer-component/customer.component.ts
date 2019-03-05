import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    // todo display errors to client
    // todo use service calls
    // todo update to subject subscription
    customers: Array<Customer>;

    constructor(private service: CustomerService) {
    }

    ngOnInit() {
        this.service.getAll().subscribe(
            data => {
                this.customers = data;
            },
            error => {
                console.error(error);
            }
        );
    }

    getCustomer(id: any) {
        // todo update
        this.service.getById(id).subscribe(data => {

                console.log(data);
            },
            err => {
                // todo display the error message
                console.error(err);
                console.error(err.status);
                console.error(err.error.exception);
                console.error(err.error.url);

            });

    }

    deleteCustomer(id: any) {

        this.service.deleteCustomer(id);
    }

    // todo update
    create() {
        console.log('creating...');
    }
}
