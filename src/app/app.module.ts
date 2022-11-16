import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HomeUserComponent } from './home-user/home-user.component';
import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EstimationComponent } from './estimation/estimation.component';
import { RapportComponent } from './rapport/rapport.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { UpdateReunionComponent } from './update-reunion/update-reunion.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { VoteComponent } from './vote/vote.component';
import { CardComponent } from './vote/card/card.component';
import { TableComponent } from './vote/table/table.component';
import { TimerComponent } from './vote/timer/timer.component';
import { MembresComponent } from './vote/membres/membres.component';
import { RobotComponent } from './vote/robot/robot.component';
import { ProjetComponent } from './vote/projet/projet.component';
import { MessageComponent } from './vote/message/message.component';
import { InviterComponent } from './inviter/inviter.component';
import { EnterGameUrlComponent } from './enter-game-url/enter-game-url.component';
import { GameComponent } from './game/game.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CallComponent } from './modules/call/components/call/call.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    NavbarComponent,
    MenubarComponent,
    SidebarComponent,
    AdminUsersComponent,

    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeUserComponent,
    HeaderComponent,
    AdminHomeComponent,
    EstimationComponent,
    RapportComponent,
    CalendrierComponent,
    UpdateReunionComponent,
    UpdateUserComponent,
    VoteComponent,
    CardComponent,
    TableComponent,
    TimerComponent,
    MembresComponent,
    RobotComponent,
    ProjetComponent,
    MessageComponent,
    InviterComponent,
    EnterGameUrlComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgChartsModule,
   // Angular Material
   MatFormFieldModule,
   MatPaginatorModule,
   MatCheckboxModule,
   MatSnackBarModule,
   MatToolbarModule,
   MatSidenavModule,
   MatButtonModule,
   MatSelectModule,
   MatInputModule,
   MatGridListModule,
   MatRadioModule,
   MatTableModule,
   MatIconModule,
   MatListModule,
   MatCardModule,
   MatProgressBarModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot({ timeOut: 4000, closeButton: true, progressBar: true }),
   FormsModule,
   ReactiveFormsModule,



  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
