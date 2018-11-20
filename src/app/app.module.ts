import { MoviesService } from './services/movies-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material/custom-material.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieItemComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
