using sorucevapuyg.Models;
using sorucevapuyg.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sorucevapuyg.Auth
{
    public class UyeService
    {
        Database1Entities db = new Database1Entities();

        public KullaniciModel KullaniciOturumAc(string kadi, string parola)
        {
           KullaniciModel uye = db.Kullanici.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new KullaniciModel()
            {
               KullaniciId = x.KullaniciId,
               KullaniciAdi = x.KullaniciAdi,
               Eposta = x.Eposta,
                Sifre = x.Sifre,
                KullaniciAdmin = x.KullaniciAdmin
            }).SingleOrDefault();
            return uye;
        }
    }
}