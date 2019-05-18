import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BadInput} from '../errors/bad-input';
import {NotFoundError} from '../errors/not-found-error';
import {AppError} from '../errors/app-error';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private url: string, private http: HttpClient) {
    }


    create(resource) {
        return this.http.post(this.url, resource)
            .pipe(
                map(response => response),
                catchError(this.handleError));
    }

    update(resource) {
        return this.http.put(this.url, resource)
            .pipe(
                map(response => response),
                catchError(this.handleError));
    }

    getAll() {
        return this.http.get(this.url)
            .pipe(
                map(response => response),
                catchError(this.handleError));
    }

    getById(id: number) {
        const byIdPath = this.url + id + '/id';
        return this.http.get(byIdPath)
            .pipe(
                map(response => response),
                catchError(this.handleError));
    }

    deleteById(id: number) {
        const byIdPath = this.url + id + '/id';
        return this.http.delete(byIdPath)
            .pipe(
                map(response => response),
                catchError(this.handleError));
    }

    // todo
    private handleError(error: Response) {
        if (error.status === 400) {
            return throwError(new BadInput(error));
        } else if (error.status === 404) {
            return throwError(new NotFoundError(error));
        } else {
            // todo cleanup - pass to error handling method
            console.log(error.status);
            console.log(error);

            return throwError(new AppError(error));
        }
    }
}
