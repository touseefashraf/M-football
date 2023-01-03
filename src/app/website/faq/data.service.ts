import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    getFaq(): Observable<any> {
        const url = `${apis.baseUrl}/public/faqs`

        return this.http.get<any>(url)
    }
}
