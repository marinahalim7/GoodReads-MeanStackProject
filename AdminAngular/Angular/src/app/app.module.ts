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
import { BookComponent } from './components/user/book/book.component';
import { AuthorComponent } from './components/user/author/author.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminAuthorsComponent } from './components/admin/admin-authors/admin-authors.component';
import { AdminBooksComponent } from './components/admin/admin-books/admin-books.component';
import { AdminCateogriesComponent } from './components/admin/admin-cateogries/admin-cateogries.component';
import { HttpClientModule} from '@angular/common/http';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';

import {AccordionModule} from 'primeng/accordion';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';      
import {ToolbarModule} from 'primeng/toolbar';   
import {FileUploadModule} from 'primeng/fileupload';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AuthordetailsComponent } from './components/user/authordetails/authordetails.component';
import { BookdetailsComponent } from './components/user/bookdetails/bookdetails.component';
import { CateogriesdetailsComponent } from './components/user/cateogriesdetails/cateogriesdetails.component';
import { NavBarComponent } from './components/user/nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';  
import {MatGridListModule} from '@angular/material/grid-list';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


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
    AuthorComponent,
    AdminLoginComponent,
    AdminAuthorsComponent,
    AdminBooksComponent,
    AdminCateogriesComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    AuthordetailsComponent,
    BookdetailsComponent,
    CateogriesdetailsComponent,
    // NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    AccordionModule,
    AutoCompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatInputModule

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
