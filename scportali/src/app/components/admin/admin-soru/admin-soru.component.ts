import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from './../../../services/alert.service';
import { SoruDialogComponent } from './../../dialogs/soru-dialog/soru-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Soru } from './../../../models/Soru';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.css']
}) 
export class AdminSoruComponent implements OnInit {
  sorular!: Soru[];
  dataSource: any;
  displayedColumns=['SoruAdi','SoruCevapSay','detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!:MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit() {
    this.SoruListele();
  }

  SoruListele(){
    this.apiServis.SoruListe().subscribe((d:any)=>{
      this.sorular = d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  PostSoru(){
    var yeniKayit: Soru = new  Soru();
    this.dialogRef=this.matDialog.open(SoruDialogComponent, {
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.PostSoru(d).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.SoruListele();
          }
        });
      }
    });

  }
  Duzenle(kayit:Soru){
    this.dialogRef=this.matDialog.open(SoruDialogComponent, {
      width:'400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        kayit.SoruAdi=d.SoruAdi;
        this.apiServis.PutSoru(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.SoruListele();
          }
        });
      }
    });
  }

  Sil(kayit:Soru){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent, {
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.SoruAdi + " Sorusu Silinecektir.Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.DeleteSoru(kayit.SoruId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.SoruListele();
          }
        });
      }
    });
  }

}
