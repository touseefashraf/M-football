import { apis } from './../../environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AdminApiService {
    baseUrl: any
    tutorProfile: any
    userLoggedInSource = new BehaviorSubject(false)
    constructor(
        public http: HttpClient) {
        this.baseUrl = `${apis.baseUrl}/admin`
        console.log(this.baseUrl)
    }


    // Subject Categories Calls
    getSubjectCategories(): Observable<any> {
        const url = `${this.baseUrl}/subject-category-list`

        return this.http.get<any>(url)
    }

    deleteSubjectCategory(params): Observable<any> {
        const url = `${this.baseUrl}/delete-subject-category`

        return this.http.post<any>(url, params)
    }

    addSubjectCategory(params): Observable<any> {
        const url = `${this.baseUrl}/add-subject-category`

        return this.http.post<any>(url, params)
    }

    updateSubjectCategory(params): Observable<any> {
        const url = `${this.baseUrl}/edit-subject-category`

        return this.http.post<any>(url, params)
    }
}
