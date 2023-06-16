import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { OnInit } from '@angular/core';
import { Soru } from 'src/app/models/Soru';






@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  KullaniciAdi: string;
  sorular: Soru[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService
    ) {}
    ngOnInit(): void {
      this.SoruListele();
      if (this.apiServis.oturumKontrol)
      this.KullaniciAdi = localStorage.getItem("KullaniciAdi");
    }

    OturumKapat(){
      localStorage.clear();
      location.href = "/";
    }
    SoruListele(){
      this.apiServis.SoruListe().subscribe((d: Soru[]) => {
      this.sorular = d;

    }
  
    );

    }

}
