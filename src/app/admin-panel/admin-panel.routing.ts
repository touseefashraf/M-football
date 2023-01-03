import { AdminPanelComponent } from './admin-panel.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from '../auth/admin-guard'

const routes: Routes = [
    {
        path: '',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(mod => mod.DashboardModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module')
                    .then(mod => mod.AdminModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module')
                    .then(mod => mod.ChangePasswordModule)
            },
            {
                path: 'trip/list',
                loadChildren: () => import('./trips/list/list.module')
                    .then(mod => mod.ListModule)
            },
            {
                path: 'trip/publish',
                loadChildren: () => import('./trips/addedit/addedit.module')
                    .then(mod => mod.AddeditModule)
            },
            {
                path: 'contact-us',
                loadChildren: () => import('./contact-us/contact-us.module')
                    .then(mod => mod.ContactUsModule)
            },
            {
                path: 'news/list',
                loadChildren: () => import('./news/list/list.module')
                    .then(mod => mod.ListModule)
            },
            {
                path: 'news/image',
                loadChildren: () => import('./news/image/image.module')
                    .then(mod => mod.ImageModule)
            },
            {
                path: 'news/publish',
                loadChildren: () => import('./news/addedit/addedit.module')
                    .then(mod => mod.AddeditModule)
            },
            {
                path: 'tournaments/list',
                loadChildren: () => import('./tournaments/list/list.module')
                    .then(mod => mod.ListModule)
            },
            {
                path: 'tournaments/image',
                loadChildren: () => import('./tournaments/image/image.module')
                    .then(mod => mod.ImageModule)
            },
            {
                path: 'media/video',
                loadChildren: () => import('./media/video/video.module')
                    .then(mod => mod.VideoModule)
            },
            {
                path: 'tours/list',
                loadChildren: () => import('./tours/list/list.module')
                    .then(mod => mod.ListModule)
            },
            {
                path: 'requests',
                loadChildren: () => import('./requests/requests.module')
                    .then(mod => mod.RequestsModule)
            },
            {
                path: 'tournaments/publish',
                loadChildren: () => import('./tournaments/addedit/addedit.module')
                    .then(mod => mod.AddeditModule)
            },
            {
                path: 'tours/publish',
                loadChildren: () => import('./tours/addedit/addedit.module')
                    .then(mod => mod.AddeditModule)
            },
            {

                path: 'team',
                loadChildren: () => import('./team/team.module')
                    .then(mod => mod.TeamModule)

            },
            {

                path: 'about-us',
                loadChildren: () => import('./about-us/about-us.module')
                    .then(mod => mod.AboutUsModule)

            },
            {

                path: 'term-and-condition',
                loadChildren: () => import('./terms-conditions/terms-conditions.module')
                    .then(mod => mod.TermsConditionsModule)

            },
            {

                path: 'privacy',
                loadChildren: () => import('./privacy/privacy.module')
                    .then(mod => mod.PrivacyModule)

            },
            {

                path: 'media',
                loadChildren: () => import('./media/media.module')
                    .then(mod => mod.MediaModule)

            },
            {

                path: 'career',
                loadChildren: () => import('./career/career.module')
                    .then(mod => mod.CareerModule)

            },
            {

                path: 'career',
                loadChildren: () => import('./career/career.module')
                    .then(mod => mod.CareerModule)

            },
            {
                path: 'country',
                loadChildren: () => import('./country/country.module')
                    .then(mod => mod.CountryModule)

            },
            {
                path: 'faq',
                loadChildren: () => import('./faqs/faqs.module')
                    .then(mod => mod.FaqsModule)

            },
            {
                path: 'image-uploader',
                loadChildren: () => import('./image-uploader/image-uploader.module')
                    .then(mod => mod.ImageUploaderModule)

            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPanelRoutes { }
