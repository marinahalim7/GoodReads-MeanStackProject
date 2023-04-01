import { AuthorComponent } from './components/user/author/author.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './components/user/not-found/not-found.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { CateogriesdetailsComponent } from './components/user/cateogriesdetails/cateogriesdetails.component';
import { AuthordetailsComponent } from './components/user/authordetails/authordetails.component';
import { BookdetailsComponent } from './components/user/bookdetails/bookdetails.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CateogriesComponent } from './components/user/cateogries/cateogries.component';
import { BookComponent } from './components/user/book/book.component';

const routes: Routes = [
  {path:'',redirectTo: 'books', pathMatch: 'full'},
  //{path:'register/home',redirectTo: 'login', pathMatch: 'full'},
  {path:'home',canActivate:[AuthGuard],component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'authors',component: AuthorComponent},
  {path:'authordetails/:id',component:AuthordetailsComponent},
  {path:'cateogories',component: CateogriesComponent},
  {path:'books',component: BookComponent},
  {path:'cateogrydetails/:id',component: CateogriesdetailsComponent},
  {path:'bookdetails/:id',component: BookdetailsComponent},
  {path:'**',component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

