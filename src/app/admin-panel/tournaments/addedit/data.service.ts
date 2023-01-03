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
        const url = `${this.baseUrl}/add-tournament`

        return this.http.post<any>(url, params)
    }

    update(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-tournament`

        return this.http.post<any>(url, params)
    }

    deleteImage(params: any) {
        const url = `${this.baseUrl}/delete-tournament-image`

        return this.http.post<any>(url, params)
    }

    getDetails(params: any): Observable<any> {
        const url = `${this.baseUrl}/tournament-detail`

        return this.http.post<any>(url, params)
    }

    uploadFile(formData: FormData) {
        const url = `${this.baseUrl}/save-tournament-image`

        return this.http.post<any>(url, formData)
    }
    teams(): Observable<any> {
        const url = `${apis.baseUrl}/public/team-list`

        return this.http.get<any>(url)
    }

    addTeam(postData): Observable<any> {
        const url = `${this.baseUrl}/add-tournament-teams`

        return this.http.post<any>(url, postData)
    }

    deleteTeam(params): Observable<any> {
        const url = `${this.baseUrl}/delete-tournament-team`

        return this.http.post<any>(url, params)
    }

}
