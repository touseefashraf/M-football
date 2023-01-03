import { HttpClient } from '@angular/common/http'
import { apis } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }
    tournamentList(params): Observable<any> {
        const url = `${apis.baseUrl}/public/tournament-list`

        return this.http.get<any>(url, { params })
    }
}
