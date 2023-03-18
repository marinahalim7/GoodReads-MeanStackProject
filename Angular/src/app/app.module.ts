import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { AboutComponent } from './components/user/about/about.component';
import { CateogriesComponent } from './components/user/cateogries/cateogries.component';
import { NotFoundComponent } from './components/user/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { BookComponent } from './components/admin/book/book.component';
import { AuthorComponent } from './components/admin/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CateogriesComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    BookComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
