import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieDetailsComponent } from './feature/movie-details/movie-details.component';
import { MoviesListComponent } from './feature/movies-list/movies-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesListComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

