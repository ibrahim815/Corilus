import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RouteGuardService } from './_services/route-guard.service';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ChatComponent } from './chat/chat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserGuard } from './_services/user.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { EstimationComponent } from './estimation/estimation.component';
import { RapportComponent } from './rapport/rapport.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateReunionComponent } from './update-reunion/update-reunion.component';
import { VoteComponent } from './vote/vote.component';
import { InviterComponent } from './inviter/inviter.component';
import { EnterGameUrlComponent } from './enter-game-url/enter-game-url.component';
const routes: Routes = [

  {
    path: 'call/:roomId',
    loadChildren: () => import('./modules/call/call.module').then(c => c.CallModule)
  },

  {path: 'home', component: HomeComponent },

  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent },
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path: ':id', component: EnterGameUrlComponent},
  { path: 'admin', component: BoardAdminComponent, children : [
    {path:'homeAdmin',component:AdminHomeComponent},
    { path: 'profile', component: ProfileComponent },

    {path: 'users', component: AdminUsersComponent},
      {path: 'update-user', component: UpdateUserComponent},
      {path: 'estimate/:id', component: VoteComponent},
    {path: 'estimation-rooms',component:EstimationComponent},
    {path: 'invite-members',component:InviterComponent},
    {path: 'update-estimation-room', component: UpdateReunionComponent},
    {path: 'room/:id', component: VoteComponent},
    {path: 'reports',component:RapportComponent},
    {path: 'calendar',component:CalendrierComponent}
  ] },
  {path: 'user',canActivate:[UserGuard],component: BoardUserComponent, children:[
    {path:'homeUser',component:HomeUserComponent},
    {path: 'profile', component: ProfileComponent },
    {path: 'mod',component: BoardModeratorComponent, children:[
      {path:'homeUser',component:HomeUserComponent},
      {path: 'profile', component: ProfileComponent },
    ] },
  ] },
  {path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes , { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
