import { ApiService } from 'src/app/services/api.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from 'src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/${this.api.user.user_type}`
    qtoListDetails: Array<any> = []
    projectOwnerList: Array<any> = []
    csiDivisionList: Array<any> = []
    planHoldersList: any = []
    customerList: any = []
    newsDetails: any = {}
    planholdersDataToSend: any = []
    public needsRefresh = true
    step: any = 1
    step1Data: any = null
    planholderFetching = true
    selectedId: any = -1
    bidPhase = 'open'
    constructor(public http: HttpClient, private api: ApiService) {
    }
    save(params: any): Observable<any> {
        const url = `${this.baseUrl}/add-news`

        return this.http.post<any>(url, params)
    }

    update(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-news`

        return this.http.post<any>(url, params)
    }

    deleteImage(params: any) {
        const url = `${this.baseUrl}/delete-news-image`

        return this.http.post<any>(url, params)
    }

    getDetails(id: any): Observable<any> {
        const url = `${this.baseUrl}/news-detail/${id}`

        return this.http.get<any>(url)
    }

    uploadFile(formData: FormData) {
        const url = `${this.baseUrl}/save-news-image`

        return this.http.post<any>(url, formData)
    }

    list(): Observable<any> {
        const url = `${apis.baseUrl}/public/tournament-list`

        return this.http.get<any>(url)
    }
    saveContent(data: any): Observable<any> {
        const url = `${this.baseUrl}/save-news-content`

        return this.http.post<any>(url, data)
    }

    getContent(params: any): Observable<any> {
        const url = `${this.baseUrl}/news-content`

        return this.http.get<any>(url, { params })
    }


}
