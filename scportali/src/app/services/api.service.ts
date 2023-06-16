import { Kullanici } from './../models/Kullanici';
import { Cevap } from './../models/Cevap';
import { Soru } from './../models/Soru';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44356/api/";
  siteUrl="https://localhost:44356/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(KullaniciAdi: string, parola: string) {
    var data = "username=" + KullaniciAdi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var kullaniciYetkiler: string[] = JSON.parse(localStorage.getItem("kullaniciYetkileri"));

    if (kullaniciYetkiler) {
      yetkiler.forEach(element => {
        if (kullaniciYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */
  SoruListe() {
    return this.http.get<Soru[]>(this.apiUrl + "soruliste");
  }  
  GetSoru(SoruId: number) {
    return this.http.get(this.apiUrl + "getsoru/" + SoruId);
  }
  PostSoru(Soru: Soru) {
    return this.http.post(this.apiUrl + "postsoru", Soru);
  }
  PutSoru(Soru: Soru) {
    return this.http.put(this.apiUrl + "putsoru", Soru);
  }
  DeleteSoru(SoruId: number) {
    return this.http.delete(this.apiUrl + "deletesoru/" + SoruId);
  }
  

  CevapListe() {
    return this.http.get(this.apiUrl + "cevapliste");
  } 
  GetCevap(SoruId: number) {
    return this.http.get(this.apiUrl + "getcevap/" + SoruId);
  }
  CevapListeByKullaniciId(kullaniciId: number) {
    return this.http.get(this.apiUrl + "cevaplistebykullaniciid/" + kullaniciId);
  }
  CevapById(CevapId: number) {
    return this.http.get(this.apiUrl + "cevapbyid/" + CevapId);
  }
  PostCevap(cevap: Cevap) {
    return this.http.post(this.apiUrl + "postcevap", cevap);
  }
  PutCevap(cevap: Cevap) {
    return this.http.put(this.apiUrl + "putcevap", cevap);
  }


  KullaniciListe() {
    return this.http.get(this.apiUrl + "kullaniciliste");
  }
  KullaniciById(KullaniciId: number) {
    return this.http.get(this.apiUrl + "kullanicibyid/" + KullaniciId);
  }
  KullaniciEkle(Kullanici: Kullanici) {
    return this.http.post(this.apiUrl + "kullaniciekle", Kullanici);
  }
  KullaniciDuzenle(Kullanici: Kullanici) {
    return this.http.put(this.apiUrl + "kullaniciduzenle", Kullanici);
  }

}
