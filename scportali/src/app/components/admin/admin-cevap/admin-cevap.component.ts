import { Soru } from './../../../models/Soru';
import { CevapDialogComponent } from './../../dialogs/cevap-dialog/cevap-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';
import { Cevap } from './../../../models/Cevap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-cevap',
  templateUrl: './admin-cevap.component.html',
  styleUrls: ['./admin-cevap.component.css']
})
export class AdminCevapComponent implements OnInit {
  cevaplar!: Cevap[];
  sorular!: Soru[];
  secSoru!:Soru;
  SoruId!: number;
  KullaniciId!: number ;
  dataSource: any;
  displayedColumns=['Baslik','Tarih','KullaniciAdi','Okunma','detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!:MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.SoruListele();
    this.KullaniciId= parseInt(localStorage.getItem("KullaniciId")!);
    this.route.params.subscribe(p=>{
      if (p['SoruId']){
        this.SoruId = p['SoruId'];
  
      }

    })
    this.CevapListele();
  }
  GetSoru(){
    this.apiServis.GetSoru(this.SoruId).subscribe((d:any)=>{
      this.secSoru = d;     
      this.CevapListele();
    });
  }

 CevapListele(){
    this.apiServis.CevapById(this.SoruId).subscribe((d:any)=>{
      this.cevaplar = d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  SoruListele(){
    this.apiServis.SoruListe().subscribe((d:any)=>{
      this.sorular = d;
    });
  }
  SoruSec(soru:Soru){
    this.SoruId=soru.SoruId;
    this.CevapListele();
  }

  Ekle(){
    var yeniKayit: Cevap = new  Cevap();
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
      width:'800px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        yeniKayit =d;
        yeniKayit.Tarih=new Date();
        yeniKayit.Okunma=0;
        yeniKayit.KullaniciId = this.KullaniciId;
        //console.log(yeniKayit);
        this.apiServis.PostCevap(yeniKayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.CevapListele();
          }
        });
      }
    });

  }
  Duzenle(kayit:Cevap){
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
      width:'800px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.PutCevap(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.CevapListele();
          }
        });
      }
    });
  }

  Detay(kayit:Cevap){
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
      width:'800px',
      data:{
        kayit: kayit,
        islem: 'detay'
      }
    });
  }
 

  
          }