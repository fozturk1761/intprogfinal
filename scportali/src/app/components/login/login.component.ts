import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
    public alert: AlertService
  ) { }

  ngOnInit() {
  }
  OturumAc (KullaniciAdi: string, sifre: string) {
    this.apiServis.tokenAl(KullaniciAdi, sifre).subscribe((d: any) => {

      localStorage.setItem("token", d.access_token);
      localStorage.setItem("KullaniciId", d.KullaniciId);
      localStorage.setItem("KullaniciAdi", d.KullaniciAdi);
      localStorage.setItem("KullaniciYetkileri", d.KullaniciYetkileri);
      location.href = "/";
    }, err => {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kullanıcı Adı veya Parola Geçersizdir!";
      this.alert.AlertUygula(s);
    });

    
    

  }

}
