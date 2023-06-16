import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { AdminKullaniciComponent } from 'src/app/components/admin/admin-kullanici/admin-kullanici.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'admin/soru', component: AdminSoruComponent
  },
  {
    path: 'admin/cevap', component: AdminCevapComponent
  },
  {
    path: 'admin/kullanici', component: AdminKullaniciComponent
  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
