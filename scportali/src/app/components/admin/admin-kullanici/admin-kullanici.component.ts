import { ApiService } from './../../../services/api.service';
import { KullaniciDialogComponent } from './../../dialogs/kullanici-dialog/kullanici-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Kullanici } from './../../../models/Kullanici';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-kullanici',
  templateUrl: './admin-kullanici.component.html',
  styleUrls: ['./admin-kullanici.component.css']
})
export class AdminKullaniciComponent implements OnInit {
  kullanicilar!: Kullanici[];
  dataSource: any;
  displayedColumns = ['KullaniciAdi', 'Eposta', 'AdSoyad', 'KullaniciAdmin', 'detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!: MatDialogRef<KullaniciDialogComponent>;
  dialogRefConfirm!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KullaniciListele();
  }

  KullaniciListele() {
    this.apiServis.KullaniciListe().subscribe((d: any) => {
      this.kullanicilar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    var yeniKayit: Kullanici = new Kullanici();
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KullaniciEkle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KullaniciListele();
          }
        });
      }
    });

  }
  Duzenle(kayit: Kullanici) {
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.KullaniciAdi = d.KullaniciAdi;
        kayit.Eposta = d.Eposta;
        kayit.Sifre = d.Sifre;
        kayit.AdSoyad = d.AdSoyad;
        kayit.KullaniciAdmin = d.KullaniciAdmin;
        this.apiServis.KullaniciDuzenle(kayit).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KullaniciListele();
          }
        });
      }
    });
  }


}
