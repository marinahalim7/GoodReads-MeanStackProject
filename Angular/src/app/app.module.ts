import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorComponent } from './components/author/author.component';
import { AuthordetailsComponent } from './components/authordetails/authordetails.component';
import { BookComponent } from './components/book/book.component';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import { CateogriesComponent } from './components/cateogries/cateogries.component';
import { CateogriesdetailsComponent } from './components/cateogriesdetails/cateogriesdetails.component';
import { CateogrycursolComponent } from './components/cateogrycursol/cateogrycursol.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthordetailsComponent,
    BookComponent,
    BookdetailsComponent,
    CateogriesComponent,
    CateogriesdetailsComponent,
    CateogrycursolComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    RatingModule,
    FormsModule,
    MatTableModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
