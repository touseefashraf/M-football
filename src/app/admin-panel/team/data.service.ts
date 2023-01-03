import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../environments/environment'


@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    getTeam(page: any): Observable<any> {
        const url = `${this.baseUrl}/admin/team-list?page=${page}`

        return this.http.get<any>(url)
    }

    getCountries(): Observable<any> {
        const url = `${this.baseUrl}/admin/country-list`

        return this.http.get<any>(url)
    }

    addTeam(params): Observable<any> {
        const url = `${this.baseUrl}/admin/add-team`

        return this.http.post<any>(url, params)
    }

    updateTeam(params): Observable<any> {
        const url = `${this.baseUrl}/admin/update-team`

        return this.http.post<any>(url, params)
    }

    deleteTeam(params): Observable<any> {
        const url = `${this.baseUrl}/admin/delete-team`

        return this.http.post<any>(url, params)
    }

}

