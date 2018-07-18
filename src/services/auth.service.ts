import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from '../models/User';
import { CONFIG } from '../app/config';

@Injectable()
export class AuthService {
    public authenticated: boolean = false;
    public currentUser: User;
    constructor() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticated = currentUser ? true : false;
        this.currentUser = this.authenticated ? <User>currentUser : null;
    }

    login(phone_no: string, password: string): Observable<User> {
        return new Observable((observer) => {
            if (phone_no === '12345' && password === '12345') {
                this.authenticated = true;
                this.currentUser = new User(1, "Test User", "123456", "test-token");
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                observer.next(this.currentUser)
            } else {
                observer.error('Invalid username or password');
            }
        });
    }

    logout() {
        this.authenticated = false;
        localStorage.removeItem('currentUser');
    }
}