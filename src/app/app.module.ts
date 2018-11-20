
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material/custom-material.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AppRoutingModule } from './app.routing.module';
import { BaseComponent } from './base.component';
import { MoviesService } from './services/movies-service';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    MoviesListComponent,
    MovieItemComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
