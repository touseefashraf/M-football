import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { WebsiteComponent } from './website.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WebsiteGuard } from '../auth/website-guard'
import { NoAuthGuard } from '../auth/no-auth-guard'

const routes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
        canActivate: [WebsiteGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./index/index.module')
                    .then(mod => mod.IndexModule)
            },
            {
                path: 'login',
                canActivate: [NoAuthGuard],
                loadChildren: () => import('./login/login.module')
                    .then(mod => mod.LoginModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('./forgot-password/forgot-password.module')
                    .then(mod => mod.ForgotPasswordModule)
            },
            {
                path: 'reset-password/:code',
                loadChildren: () =>
                    import('./reset-password/reset-password.module').then(
                        mod => mod.ResetPasswordModule
                    )
            },
            {
                path: 'contact-us',
                loadChildren: () => import('./contact-us/contact-us.module')
                    .then(mod => mod.ContactUsModule)
            },
            {
                path: 'terms-and-conditions',
                loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module')
                    .then(mod => mod.TermsAndConditionsModule)
            },
            {
                path: 'tournament-detail',
                loadChildren: () => import('./tournament-detail/tournament-detail.module')
                    .then(mod => mod.TournamentDetailModule)
            },
            {
                path: 'tour-detail',
                loadChildren: () => import('./tours/tours.module')
                    .then(mod => mod.ToursModule)
            },
            {
                path: 'coaching-trips',
                loadChildren: () => import('./coaching-tips/coaching-tips.module')
                    .then(mod => mod.CoachingTipsModule)
            },
            {
                path: 'news',
                loadChildren: () => import('./news/news.module')
                    .then(mod => mod.NewsModule)
            },
            {
                path: 'news-detail',
                loadChildren: () => import('./news-detail/news-detail.module')
                    .then(mod => mod.NewsDetailModule)
            },
            {
                path: 'about-us',
                loadChildren: () => import('./about-us/about-us.module')
                    .then(mod => mod.AboutUsModule)
            },
            {
                path: 'faq',
                loadChildren: () => import('./faq/faq.module')
                    .then(mod => mod.FaqModule)
            },
            {
                path: 'rules',
                loadChildren: () => import('./rules/rules.module')
                    .then(mod => mod.RulesModule)
            },
            {
                path: 'history',
                loadChildren: () => import('./history/history.module')
                    .then(mod => mod.HistoryModule)
            },
            {
                path: 'tournament-list',
                loadChildren: () => import('./tournament-list/tournament-list.module')
                    .then(mod => mod.TournamentListModule)
            },
            {
                path: 'careers',
                loadChildren: () => import('./careers/careers.module')
                    .then(mod => mod.CareersModule)
            },
            {
                path: 'media',
                loadChildren: () => import('./media/media.module')
                    .then(mod => mod.MediaModule)
            },
            {
                path: 'privacy',
                loadChildren: () => import('./privacy/privacy.module')
                    .then(mod => mod.PrivacyModule)
            },
            {
                path: 'groups',
                loadChildren: () => import('./groups/groups.module')
                    .then(mod => mod.GroupsModule)
            },
            {
                path: 'match-schedule',
                loadChildren: () => import('./match-schedule/match-schedule.module')
                    .then(mod => mod.MatchScheduleModule)
            },
            {
                path: 'prices',
                loadChildren: () => import('./price/price.module')
                    .then(mod => mod.PriceModule)
            },
            {
                path: 'registration',
                loadChildren: () => import('./registration/registration.module')
                    .then(mod => mod.RegistrationModule)
            },
            {
                path: 'tour-list',
                loadChildren: () => import('./tour-list/tour-list.module')
                    .then(mod => mod.TourListModule)
            },
            {
                path: 'coaching-trip-list',
                loadChildren: () => import('./coaching-trip-list/coaching-trip-list.module')
                    .then(mod => mod.CoachingTripListModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: { message: 'From Website' }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutes { }
