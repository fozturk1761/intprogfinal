import { Soru } from './../../../models/Soru';
import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik!: string;
  Baslik!: string;
  yeniKayit!: Soru;
  islem!: string;
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem == "ekle"){
      this.dialogBaslik="Soru Ekle";
      this.yeniKayit=new Soru();
    }
    if (this.islem == "duzenle"){
      this.dialogBaslik="Soru Düzenle";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      SoruAdi: [this.yeniKayit.SoruAdi]
    });
  }

}