import { ApiService } from 'src/app/services/api.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/${this.api.user.user_type}`

    constructor(public http: HttpClient, private api: ApiService) {
    }

    delete(params: any): Observable<any> {
        const url = `${this.baseUrl}/delete-news`

        return this.http.post<any>(url, params)
    }

    list( page: any): Observable<any> {
        const url = `${this.baseUrl}/news-list?page=${page}`

        return this.http.get<any>(url)
    }

    changeStatus(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-news-status`

        return this.http.post<any>(url, params)
    }

}
