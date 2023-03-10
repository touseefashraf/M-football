import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {

    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getCountry(): Observable<any> {
        const url = `${this.baseUrl}/admin/country-list`

        return this.http.get<any>(url)
    }

    addCountry(params): Observable<any> {
        const url = `${this.baseUrl}/admin/add-country`

        return this.http.post<any>(url, params)
    }

    updateCountry(params): Observable<any> {
        const url = `${this.baseUrl}/admin/update-country`

        return this.http.post<any>(url, params)
    }

    deleteCountry(params): Observable<any> {
        const url = `${this.baseUrl}/admin/delete-country `

        return this.http.post<any>(url, params)
    }

}
