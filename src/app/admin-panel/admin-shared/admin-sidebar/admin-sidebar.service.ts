import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AdminSidebarService {
    toggled = false
    _hasBackgroundImage = true
    menus = [
        {
            title: 'Dashboard',
            link: 'dashboard',
            icon: 'fa fa-tachometer-alt',
            active: true,
            type: 'simple'
        },
        {
            title: 'Products',
            icon: '	fa fa-product-hunt',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Tournaments',
                    link: 'tournaments/list',
                    type: 'simple'
                },
                {
                    title: 'Tours',
                    link: 'tours/list',
                    type: 'simple'
                },
                {
                    title: 'Coaching Education Trip',
                    link: 'trip/list',
                    type: 'simple'
                }
            ]
        },
        {
            title: 'Pages',
            icon: 'fa fa-file',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'About us',
                    link: 'about-us',
                    type: 'simple'
                },
                {
                    title: 'Terms & Conditions',
                    link: 'term-and-condition',
                    type: 'simple'
                },
                {
                    title: 'Privacy',
                    link: 'privacy',
                    type: 'simple'
                },
                {
                    title: 'Career',
                    link: 'career',
                    type: 'simple'
                },
                {
                    title: 'FAQ',
                    link: 'faq',
                    type: 'simple'
                },

            ]
        },
        {
            title: 'Teams',
            icon: 'fas fa-users',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Teams',
                    link: 'team',
                    type: 'simple'
                },
                {
                    title: 'Country',
                    link: 'country',
                    type: 'simple'
                }

            ]
        },
        
        {
            title: 'News',
            icon: 'fa fa-address-book',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'News',
                    link: 'news/list',
                    type: 'simple'
                }
            ]
        },
        {
            title: 'Media',
            icon: 'fa fa-address-book',
            active: false,
            type: 'dropdown',
            submenus: [
                {
                    title: 'Tournament Main Image',
                    link: 'tournaments/image',
                    type: 'simple'
                },
                {
                    title: 'News Main Image',
                    link: 'news/image',
                    type: 'simple'
                 },
                // {
                //     title: 'Home Video',
                //     link: 'media/video',
                //     type: 'simple'
                // }

            ]
        },
        // {
        //     title: 'Contact Us',
        //     link: 'contact-us',
        //     icon: 'fa fa-address-book',
        //     active: true,
        //     type: 'simple'
        // },
        // {
        //     title: 'Country',
        //     link: 'country',
        //     icon: 'fa fa-5x fa-flag',
        //     active: true,
        //     type: 'simple'
        // },

        // {
        //     title: 'Tournaments & Tours',
        //     link: 'tournaments/list',
        //     icon: 'fa fa-address-book',
        //     active: true,
        //     type: 'simple'
        // },
        {
            title: 'Requests',
            link: 'requests',
            icon: 'fa fa-address-book',
            active: true,
            type: 'simple'
        },
        // {
        //     title: 'Media',
        //     link: 'media',
        //     icon: 'fa fa-address-book',
        //     active: true,
        //     type: 'simple'
        // },
        // {
        //     title: 'Teams',
        //     link: 'team',
        //     icon: 'fa fa-users',
        //     active: true,
        //     type: 'simple'
        // },
        // {
        //     title: 'Faqs',
        //     link: 'faq',
        //     icon: 'fas fa-question',
        //     active: true,
        //     type: 'simple'
        // },
        {
            title: 'Change Password',
            link: 'change-password',
            icon: 'fa fa-address-book',
            active: true,
            type: 'simple'
        }
    ] // menu

    constructor() { }

    toggle() {
        this.toggled = !this.toggled
    }

    getSidebarState() {
        return this.toggled
    }

    setSidebarState(state: boolean) {
        this.toggled = state
    }

    getMenuList() {
        return this.menus
    }

    get hasBackgroundImage() {
        return this._hasBackgroundImage
    }

    set hasBackgroundImage(hasBackgroundImage) {
        this._hasBackgroundImage = hasBackgroundImage
    }
}
