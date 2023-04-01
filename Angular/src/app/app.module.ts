import { AuthorComponent } from './components/user/author/author.component';
import { BookComponent } from './components/user/book/book.component';
import { NavBarComponent } from './components/user/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { AboutComponent } from './components/user/about/about.component';
import { CateogriesComponent } from './components/user/cateogries/cateogries.component';
import { NotFoundComponent } from './components/user/not-found/not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthordetailsComponent } from './components/user/authordetails/authordetails.component';
import { BookdetailsComponent } from './components/user/bookdetails/bookdetails.component';
import { CateogriesdetailsComponent } from './components/user/cateogriesdetails/cateogriesdetails.component';
import { CateogrycursolComponent } from './components/user/cateogrycursol/cateogrycursol.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxStarsModule } from 'ngx-stars';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CateogriesComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AuthordetailsComponent,
    BookdetailsComponent,
    CateogriesdetailsComponent,
    NavBarComponent,
    BookComponent,
    AuthorComponent,
    CateogrycursolComponent

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,  
    NgxStarRatingModule,
    NgxStarsModule,
    RatingModule,
    ButtonModule,
    FormsModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
