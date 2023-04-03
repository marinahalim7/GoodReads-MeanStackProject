import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { AuthorComponent } from './components/author/author.component';
import { CateogriesComponent } from './components/cateogries/cateogries.component';
import { BookComponent } from './components/book/book.component';
import { AuthordetailsComponent } from './components/authordetails/authordetails.component';
import { CateogriesdetailsComponent } from './components/cateogriesdetails/cateogriesdetails.component';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
{path:'',redirectTo: 'login', pathMatch: 'full'},
//{path:'register/home',redirectTo: 'login', pathMatch: 'full'},
{path:'home',canActivate:[AuthGuard],component: HomeComponent},
{path:'login',component: LoginComponent},
{path:'register',component:RegisterComponent},
{path:'authors',canActivate:[AuthGuard],component: AuthorComponent},
{path:'authordetails/:id',canActivate:[AuthGuard],component:AuthordetailsComponent},
{path:'cateogories',canActivate:[AuthGuard],component: CateogriesComponent},
{path:'books',canActivate:[AuthGuard],component: BookComponent},
{path:'cateogrydetails/:id',canActivate:[AuthGuard],component: CateogriesdetailsComponent},
{path:'bookdetails/:id',canActivate:[AuthGuard],component: BookdetailsComponent},
{path:'**',component: NotFoundComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
