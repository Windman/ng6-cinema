import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CinemaComponent } from './feature/cinema/cinema.component';
import { MovieDetailsComponent } from './feature/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: CinemaComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' } // TODO change route and provide special 404 component
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

