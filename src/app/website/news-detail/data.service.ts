import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`

    constructor(public http: HttpClient) { }

    newsDetail(id: any): Observable<any> {
        const url = `${this.baseUrl}/news-detail/${id}`

        return this.http.get<any>(url)
    }

}
