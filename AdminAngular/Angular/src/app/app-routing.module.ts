import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthgardGuard } from './authgard.guard';
import { AdminAuthorsComponent } from './components/admin/admin-authors/admin-authors.component';
import { AdminBooksComponent } from './components/admin/admin-books/admin-books.component';
import { AdminCateogriesComponent } from './components/admin/admin-cateogries/admin-cateogries.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AboutComponent } from './components/user/about/about.component';
import { CateogriesComponent } from './components/user/cateogries/cateogries.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { NotFoundComponent } from './components/user/not-found/not-found.component';
import { RegisterComponent } from './components/user/register/register.component';



const routes: Routes = [
  {path:'',redirectTo: 'AdminLogin', pathMatch: 'full'},
  {path:'AdminNavbar', component:AdminNavbarComponent},
  {path:'AdminHome',canActivate:[AuthgardGuard], component:AdminHomeComponent},
  {path:'AdminAuthors',canActivate:[AuthgardGuard], component:AdminAuthorsComponent},
  {path:'AdminBooks',canActivate:[AuthgardGuard],component:AdminBooksComponent},
  {path:'AdminCateogries',canActivate:[AuthgardGuard],component:AdminCateogriesComponent},
  {path:'AdminLogin', component:AdminLoginComponent},
  {path:'AdminHome/AdminCateogries',component:AdminCateogriesComponent},
  {path:'AdminHome/AdminBooks',component:AdminBooksComponent},
  {path:'AdminHome/AdminAuthors',component:AdminAuthorsComponent},

  //  {path:'',redirectTo: 'home', pathMatch: 'full'},
  // {path:'register/home',redirectTo: 'login', pathMatch: 'full'},
  // {path:'about',component: AboutComponent},
  // {path:'cateogories',component: CateogriesComponent},
  // {path:'home',canActivate:[AuthGuard],component: HomeComponent},
  // {path:'login',component: LoginComponent},
  // {path:'register',component: RegisterComponent},
  // {path:'**',component: NotFoundComponent},
  // {path:'logout',component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
