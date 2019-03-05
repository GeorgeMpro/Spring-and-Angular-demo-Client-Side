import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from '../company.model';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    // todo update functionality
    // todo change to subject subscription
    private companies: Array<Company>;

    constructor(private service: CompanyService) {
    }

    ngOnInit() {
        // todo change to subject subscription
        this.service.getAll().subscribe(
            data => {
                this.companies = data;
            },
            error => {
                console.log(error);
            }
        );
    }

    // todo
    getById(id: any) {
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

    delete(id: any) {
        this.service.deleteCompany(id);
    }

    //    todo
    create() {
        console.log('...creating...');

    }
}
