import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kullanici-soru-dialog',
  templateUrl: './kullanici-soru-dialog.component.html',
  styleUrls: ['./kullanici-soru-dialog.component.css']
})
export class KullaniciSoruDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Soru;
  kayit: Soru;
  islem:string;
  frm:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<KullaniciSoruDialogComponent>,
    public frmBuild:FormBuilder,
    public apiServis: ApiService, 
    @Inject(MAT_DIALOG_DATA) 
    public data:any
  ) { 
    this.islem=data.islem;
    console.log(this.data)
    if(this.islem=='duzenle'){
      console.log(this.yeniKayit);
      this.dialogBaslik= "Soru Düzenle";
      this.yeniKayit = data.kayit;
    }
    if (!this.yeniKayit) {
      this.yeniKayit = new Soru();
      this.kayit = data;
    }
    this.frm=this.FormOlustur();

  }
  ngOnInit() {
  }


  FormOlustur(){
    return this.frmBuild.group({
      Baslik:[this.yeniKayit.Baslik],
      Icerik:[this.yeniKayit.SoruIcerik],

    });
  }
 
  }