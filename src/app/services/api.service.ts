import { Router } from '@angular/router'
import { ConstantsService } from './constants.service'
import { map } from 'rxjs/operators'
import { apis } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    totalItems = new BehaviorSubject<any>(true)
    cartItmes = new BehaviorSubject<number>(0)
    public activeTab = ''
    public homeBannerPrice = ''
    searchKeyword = ''
    showLoading = new Subject<boolean>()
    baseUrl: string
    searchFilter: any
    userLoggedInSource = new BehaviorSubject(false)
    scrollBottom: boolean
    scrollBottomChange = new Subject<boolean>()
    userImage = new Subject<string>()
    userLoggedInObs = this.userLoggedInSource.asObservable()
    cartData: any = null
    user: any = {
        id: 0,
        user_name: '',
        email: '',
        user_type: '',
        api_token: '',
        balance: 0,
        status: ''
    }
    constructor(
        public http: HttpClient,
        public cs: ConstantsService
    ) {
        this.baseUrl = apis.baseUrl + '/public'
        this.scrollBottom = false
        this.scrollBottomChange.subscribe((value) => {
            this.scrollBottom = value
        })
        if (localStorage.getItem('token')) {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.userLoggedInSource.next(true)
        } else {
            this.userLoggedInSource.next(false)
        }

        if (localStorage.getItem('cart')) {
            this.cartData = JSON.parse(localStorage.getItem('cart'))
            console.log('new value 1', this.cartData.documents.length)
            this.cartItmes.next(this.cartData.documents.length)
        }
    }

    toggleScrollBottom(value: boolean): void {
        this.scrollBottomChange.next(value)
    }

    login(params: any): Observable<any> {
        const url = `${this.baseUrl}/login`

        return this.http.post<any>(url, params)
            .pipe(
                map(resp => {
                    if (resp && resp.success && resp.data.token) {
                        localStorage.setItem('token', resp.data.token)
                        localStorage.setItem('user', JSON.stringify(resp.data))
                        this.user = resp.data
                        this.userLoggedInSource.next(true)
                    }

                    return resp
                })
            )
    }

    doUserRedirects(resp: any, router: Router) {
        switch (resp.data.user_type) {
            case 'admin': {
                router.navigate(['/admin/dashboard'])
                break
            }
        }
    }

    logOut(): boolean {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.user.id = 0
        this.userLoggedInSource.next(false)

        return true
    }

    isAuthenticated(): boolean {
        if (localStorage.getItem('token')) {
            return true
        } else {
            return false
        }
    }

    isAdmin(): boolean {
        if (this.isAuthenticated() && this.user.user_type === ConstantsService.USER_ROLES.ADMIN) {
            return true
        } else {
            return false
        }
    }
    checkResetCode(data): Observable<any> {
        const url = `${this.baseUrl}/verify-code`

        return this.http.post<any>(url, data)
    }

    resetPass(data): Observable<any> {
        const url = `${this.baseUrl}/reset-password`

        return this.http.post<any>(url, data)
    }
    // public Api call
    saveContactUs(postData): Observable<any> {
        const url = `${this.baseUrl}/contact-us`

        return this.http.post<any>(url, postData)
    }

    teamImageUrl(teamId?: number) {
        teamId = teamId ? teamId : -1

        return `${apis.baseUrl}/public/team-image/${teamId}`
    }

    countryImageUrl(countryId?: number) {
        countryId = countryId ? countryId : -1

        return `${apis.baseUrl}/public/flag-image/${countryId}`
    }

    jsonToFormData(jsonObject: object, parentKey?: any, carryFormData?: FormData): FormData {

        const formData = carryFormData || new FormData()
        let index = 0

        // tslint:disable-next-line: forin
        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
                    let propName = parentKey || key
                    if (parentKey && this.isObject(jsonObject)) {
                        propName = parentKey + '[' + key + ']'
                    }
                    if (parentKey && this.isArray(jsonObject)) {
                        propName = parentKey + '[' + index + ']'
                    }
                    if (jsonObject[key] instanceof File) {
                        formData.append(propName, jsonObject[key])
                    } else if (jsonObject[key] instanceof FileList) {
                        for (let j = 0; j < jsonObject[key].length; j++) {
                            formData.append(propName + '[' + j + ']', jsonObject[key].item(j))
                        }
                    } else if (this.isArray(jsonObject[key]) || this.isObject(jsonObject[key])) {
                        this.jsonToFormData(jsonObject[key], propName, formData)
                    } else if (typeof jsonObject[key] === 'boolean') {
                        formData.append(propName, +jsonObject[key] ? '1' : '0')
                    } else {
                        formData.append(propName, jsonObject[key])
                    }
                }
            }
            index++
        }

        return formData
    }
    isArray(val: any) {
        const toString = ({}).toString

        return toString.call(val) === '[object Array]'
    }

    isObject(val: any) {
        return !this.isArray(val) && typeof val === 'object' && !!val
    }

    newsPageImageUrl() {        

        return `${apis.baseUrl}/public/news-page-image`
    }
    newsImageUrl(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/news-image/${id}`
    }

    newsThumbnailUrl(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/news-thumbnail/${id}`
    }
    homeVideoUrl() {        
        return `${apis.baseUrl}/public/news-page-image`
    }
    tournamentPageImageUrl() {        
        return `${apis.baseUrl}/public/tournaments-page-image`
    }

    tournamentImageUrl(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/tournament-image/${id}`
    }

    tournamentThumbnailUrl(id?: number) {
        id = id ? id : -1

        return `${apis.baseUrl}/public/tournament-thumbnail/${id}`
    }
}
