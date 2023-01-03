import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { apis } from '../../../environments/environment'

@Injectable()
export class DataService {

    constructor(
        private http: HttpClient
    ) { }
    tourList(params): Observable<any> {
        const url = `${apis.baseUrl}/public/tournament-list`

        return this.http.get<any>(url, { params })
    }
}
