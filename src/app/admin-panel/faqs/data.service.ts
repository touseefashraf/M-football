import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apis } from 'src/environments/environment';

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(private http: HttpClient) { }

    getFaq(): Observable<any> {
        const url = `${this.baseUrl}/admin/faqs`

        return this.http.get<any>(url)
    }

    addFaq(params): Observable<any> {
        const url = `${this.baseUrl}/admin/save-faq`

        return this.http.post<any>(url, params)
    }

    updateFaq(params): Observable<any> {
        const url = `${this.baseUrl}/admin/update-faq`

        return this.http.post<any>(url, params)
    }

    deleteFaq(params): Observable<any> {
        const url = `${this.baseUrl}/admin/delete-faq`

        return this.http.post<any>(url, params)
    }

}
