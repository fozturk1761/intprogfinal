import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { ApiService } from 'src/app/services/api.service';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { CevapDialogComponent } from 'src/app/components/dialogs/cevap-dialog/cevap-dialog.component';
import { AdminKullaniciComponent } from './components/admin/admin-kullanici/admin-kullanici.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from './services/alert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
 

    // Admin
    AdminComponent,
    AdminSoruComponent,
    AdminCevapComponent,
    AdminKullaniciComponent,


    //Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    KullaniciDialogComponent,
    CevapDialogComponent,
    SafeHTMLPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    KullaniciDialogComponent

  ],
  providers: [AlertService, ApiService, SafeHTMLPipe, AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }