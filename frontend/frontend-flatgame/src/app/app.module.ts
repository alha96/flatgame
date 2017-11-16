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
  MatProgressBarModule
} from '@angular/material';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { TasksComponent } from './overview/tasks/tasks.component';
import { TaskItemComponent } from './overview/tasks/task-item/task-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './overview/users/users.component';
import { UserItemComponent } from './overview/users/user-item/user-item.component';
import { SettingsWgComponent } from './settings-wg/settings-wg.component';
import { SelectionComponent } from './settings-wg/selection/selection.component';
import { TasksDetailComponent } from './settings-wg/tasks-detail/tasks-detail.component';
import { TaskDetailItemComponent } from './settings-wg/tasks-detail/task-detail-item/task-detail-item.component';
import {RouterModule, Routes} from "@angular/router";
import { UsersDetailComponent } from './settings-wg/users-detail/users-detail.component';
import { SettingsDetailComponent } from './settings-wg/settings-detail/settings-detail.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";
import { HttpModule } from '@angular/http';
import { LayoutComponent } from './layout/layout.component';
import {UserService} from "./services/user.service";

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
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
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
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
    HttpModule
  ],
  providers: [
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
