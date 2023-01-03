import { apis } from './../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

       get(route): Observable<any> {
        const url = `${apis.baseUrl}/public/page-content?route=`+route

        return this.http.get<any>(url)
    }

}
