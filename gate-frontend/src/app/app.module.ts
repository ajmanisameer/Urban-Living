import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormioAppConfig } from 'angular-formio';
import { FormioResources } from 'angular-formio/resource';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthConfig, AppConfig } from '../config';
import { HeaderComponent } from './header/header.component';
// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     component: HomeComponent
//   },
//   {
//     path: 'auth',
//     loadChildren: () => AuthModule
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'auth',
        loadChildren: () => AuthModule
      }
    ])

  ],
  providers: [
    FormioAuthService,
    { provide: FormioAuthConfig, useValue: AuthConfig },
    { provide: FormioAppConfig, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
