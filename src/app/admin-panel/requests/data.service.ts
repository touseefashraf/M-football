import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    list(params): Observable<any> {
        const url = `${this.baseUrl}/tour-requests`

        return this.http.get<any>(url, { params })
    }


    statusUpdate(params): Observable<any> {
        const url = `${this.baseUrl}/tour-request-update-status`

        return this.http.post<any>(url, params)
    }
    requestDetailList(id: any): Observable<any> {
        const url = `${apis.baseUrl}/admin/tour-request-details/${id}`

        return this.http.get<any>(url)
    }

}
