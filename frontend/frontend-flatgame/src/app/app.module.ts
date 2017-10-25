import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatSelectModule
} from '@angular/material';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { TasksComponent } from './overview/tasks/tasks.component';
import { TaskItemDetailComponent } from './overview/tasks/task-item/task-item-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './overview/users/users.component';
import { UserItemComponent } from './overview/users/user-item/user-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    TasksComponent,
    TaskItemDetailComponent,
    UsersComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
