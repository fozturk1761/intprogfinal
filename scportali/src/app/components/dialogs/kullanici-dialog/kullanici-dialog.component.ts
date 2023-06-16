import { FormBuilder, FormGroup } from '@angular/forms';
import { Kullanici } from './../../../models/Kullanici';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Kullanici;
  islem!: string;
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem == "ekle"){
      this.dialogBaslik="Kullanıcı Ekle";
      this.yeniKayit=new Kullanici();
    }
    if (this.islem == "duzenle"){
      this.dialogBaslik=" Düzenle";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KullaniciAdi: [this.yeniKayit.KullaniciAdi],
      Email: [this.yeniKayit.Eposta],
      Sifre: [this.yeniKayit.Sifre],
      AdSoyad: [this.yeniKayit.AdSoyad],
      KullaniciAdmin: [this.yeniKayit.KullaniciAdmin]


    });
  }

}