import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/public`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    list(): Observable<any> {
        const url = `${this.baseUrl}/tournament-list`

        return this.http.get<any>(url)
    }
    newsList(): Observable<any> {
        const url = `${this.baseUrl}/news-list`

        return this.http.get<any>(url)
    }

    tournamentSearch(params): Observable<any> {
        const url = `${this.baseUrl}/tournament-list`

        return this.http.get<any>(url, { params })
    }
}
