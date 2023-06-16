import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cevap } from './../../../models/Cevap';
import { Component, Inject, OnInit } from '@angular/core';
import { Soru } from 'src/app/models/Soru';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.css']
})
export class CevapDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Cevap;
  islem!: string;
  frm!: FormGroup;
  sorular!: Soru[];
  Jconfig = {};
  constructor(
    public apiServis:ApiService,
    public dialogRef: MatDialogRef<CevapDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem == "ekle"){
      this.dialogBaslik="Cevap Ekle";
      this.yeniKayit=new Cevap();
    }
    if (this.islem == "duzenle"){
      this.dialogBaslik="Cevap Düzenle";
      this.yeniKayit=data.kayit;
    }
    if (this.islem == "detay"){
      this.dialogBaslik="Cevap Detay";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.SoruListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      Icerik: [this.yeniKayit.CevapIcerik],
      KategoriId: [this.yeniKayit.SoruId],
    });
  }
  SoruListele(){
    this.apiServis.SoruListe().subscribe((d:any)=>{
      this.sorular = d;
    });
  }

}