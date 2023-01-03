import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`

    constructor(
        public http: HttpClient
    ) { }

    newsList(): Observable<any> {
        const url = `${this.baseUrl}/news-list`

        return this.http.get<any>(url)
    }
}
