
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './lib/material/custom-material.module';
import { MoviesListComponent } from './feature/movies-list/movies-list.component';
import { MovieItemComponent } from './feature/movies-list/movie-item/movie-item.component';
import { MovieDetailsComponent } from './feature/movie-details/movie-details.component';
import { AppRoutingModule } from './app.routing.module';
import { BaseComponent } from './base.component';
import { MoviesService } from './services/movies-service';
import { SearchComponent } from './feature/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CinemaComponent } from './feature/cinema/cinema.component';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    MoviesListComponent,
    MovieItemComponent,
    MovieDetailsComponent,
    SearchComponent,
    CinemaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    AppRoutingModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
