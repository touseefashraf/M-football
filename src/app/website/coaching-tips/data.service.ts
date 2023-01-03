import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    // private baseUrl = `${apis.baseUrl}/public`
    private data = new BehaviorSubject<Array<any>>([{ fetching: true }])
    data$ = this.data.asObservable()

    constructor(
        public http: HttpClient
    ) { }

    tourDetails(id): Observable<any> {
        const url = `${apis.baseUrl}/public/tournament-detail`

        return this.http.post<any>(url, { id })
    }
    tournamentImages(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/tournament-image/${id}`
    }
    tournamentMainImg(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/tournament-thumbnail/${id}`
    }
    teamImage(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/team-image/${id}`
    }
    newsList(): Observable<any> {
        const url = `${apis.baseUrl}/public/news-list`

        return this.http.get<any>(url)
    }
    savetourDetails(params): Observable<any> {
        const url = `${apis.baseUrl}/public/save-tour-request`

        return this.http.post<any>(url, params)
    }
    mfaImages(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/tournament-image/${id}`
    }

}
