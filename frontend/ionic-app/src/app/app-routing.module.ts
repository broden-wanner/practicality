import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectIfAuthenticatedGuard } from './core/guards/redirect-if-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
    canActivate: [RedirectIfAuthenticatedGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.module').then((m) => m.NotesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((m) => m.ProjectsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'habits',
    loadChildren: () => import('./pages/habits/habits.module').then((m) => m.HabitsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'listening',
    loadChildren: () =>
      import('./pages/listening/listening.module').then((m) => m.ListeningPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then((m) => m.LibraryPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
