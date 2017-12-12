import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatSelectModule,
  MatInputModule,
  MatSliderModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDialogModule, MatGridListModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,
  MatSnackBarModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { TasksComponent } from './overview/tasks/tasks.component';
import { TaskItemComponent } from './shared-components/task-item/task-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './overview/users/users.component';
import { UserItemComponent } from './shared-components/user-item/user-item.component';
import { SettingsWgComponent } from './settings-wg/settings-wg.component';
import { SelectionComponent } from './settings-wg/selection/selection.component';
import { TasksDetailComponent } from './settings-wg/tasks-detail/tasks-detail.component';
import { TaskDetailItemComponent } from './shared-components/task-detail-item/task-detail-item.component';
import { RouterModule, Routes } from "@angular/router";
import { UsersDetailComponent } from './settings-wg/users-detail/users-detail.component';
import { SettingsDetailComponent } from './settings-wg/settings-detail/settings-detail.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";
import { HttpModule } from '@angular/http';
import { LayoutComponent } from './layout/layout.component';
import {UserService} from "./services/user.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { TasksHistoryComponent } from './overview/tasks-history/tasks-history.component';
import { DialogIconPickerComponent } from './shared-components/dialog-icon-picker/dialog-icon-picker.component';
import { FilterComponent } from './history/filter/filter.component';
import {NouisliderModule} from "ng2-nouislider";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AbscensesComponent } from './user-dashboard/abscenses/abscenses.component';
import { AbscenseItemComponent } from './user-dashboard/abscenses/abscense-item/abscense-item.component';
import { UserDetailItemComponent } from './settings-wg/users-detail/user-detail-item/user-detail-item.component';
import { CreationComponent } from './creation/creation.component';
import {FlatService} from "./services/flat.service";
import { JoinComponent } from './join/join.component';
import { InviteComponent } from './overview/invite/invite.component';
import { HeadComponent } from './overview/head/head.component';
import {ClipboardModule} from "ngx-clipboard/dist";
import {MatTooltipModule} from '@angular/material/tooltip';
import {TaskService} from "./services/task.service";
import {MessageService} from "./services/message.service";
import {LoaderComponent} from "./loader/loader.component";
import {InterceptorService} from "./services/interceptor.service";

const appRoutes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreationComponent
  },
  {
    path: 'join/:joinid',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: JoinComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'user-dashboard',
        component: UserDashboardComponent
      },
      {
        path: 'user-dashboard/:userid',
        component: UserDashboardComponent
      },
      {
        path: 'settings-flat',
        component: SettingsWgComponent,
        children: [
          {
            path: 'tasks-detail',
            component: TasksDetailComponent
          },
          {
            path: 'users-detail',
            component: UsersDetailComponent
          },
          {
            path: 'settings-detail',
            component: SettingsDetailComponent
          }]
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: '**',
        redirectTo: 'overview'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    TasksComponent,
    TaskItemComponent,
    UsersComponent,
    UserItemComponent,
    SettingsWgComponent,
    SelectionComponent,
    TasksDetailComponent,
    TaskDetailItemComponent,
    UsersDetailComponent,
    SettingsDetailComponent,
    HistoryComponent,
    LoginComponent,
    LayoutComponent,
    TasksHistoryComponent,
    DialogIconPickerComponent,
    FilterComponent,
    UserDashboardComponent,
    AbscensesComponent,
    AbscenseItemComponent,
    UserDetailItemComponent,
    CreationComponent,
    JoinComponent,
    InviteComponent,
    HeadComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpClientModule,
    MatGridListModule,
    NouisliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ClipboardModule,
    MatTooltipModule
  ],
  providers: [
    UserService,
    FlatService,
    TaskService,
    MessageService,
    AuthGuard,
    InterceptorService,
    {provide: HTTP_INTERCEPTORS, useExisting: InterceptorService, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogIconPickerComponent] //can someone explain why?
})

export class AppModule { }
