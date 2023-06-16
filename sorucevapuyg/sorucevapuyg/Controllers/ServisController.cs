using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using sorucevapuyg.Models;
using sorucevapuyg.ViewModel;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;




namespace sorucevapuyg.Controllers
{
    public class ServisController : ApiController
    {
        Database1Entities db = new Database1Entities();
        SonucModel sonuc = new SonucModel();

        #region Soru
        [HttpGet]
        [Route("api/soruliste")]
        public List<SoruModel> SoruListe()
        {
            List<SoruModel> liste = db.Soru.Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Baslik = x.Baslik,
                SoruIcerik = x.SoruIcerik,
                Tarih = x.Tarih,
                KullaniciId = x.KullaniciId
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/getsoru/{id}")]
        public IHttpActionResult GetSoru(int id)
        {
            var soru = db.Soru.Find(id);
            if (soru == null)
            {
                return NotFound();
            }

            var soruModel = new SoruModel();
            soruModel.SoruId = soru.SoruId;
            soruModel.Baslik = soru.Baslik;
            soruModel.SoruIcerik = soru.SoruIcerik;
            soruModel.Tarih = soru.Tarih;
            soruModel.KullaniciId = soru.KullaniciId;

            return Ok(soruModel);
        }

        [HttpPost]
        [Route("api/postsoru")]
        public IHttpActionResult PostSoru(SoruModel soruModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kullanici = db.Kullanici.Find(soruModel.KullaniciId);
            if (kullanici == null)
            {
                return BadRequest("Kullanıcı bulunamadı.");
            }

            var soru = new Soru();
            soru.Baslik = soruModel.Baslik;
            soru.SoruIcerik = soruModel.SoruIcerik;
            soru.Tarih = DateTime.Now;
            soru.KullaniciId = soruModel.KullaniciId;

            db.Soru.Add(soru);
            db.SaveChanges();

            return Ok(soru.SoruId);
        }

        [HttpPut]
        [Route("api/putsoru/{id}")]
        public IHttpActionResult PutSoru(int id, SoruModel soruModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var soru = db.Soru.Find(id);
            if (soru == null)
            {
                return NotFound();
            }

            soru.Baslik = soruModel.Baslik;
            soru.SoruIcerik = soruModel.SoruIcerik;
            soru.Tarih = DateTime.Now;

            db.Entry(soru).State = EntityState.Modified;
            db.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Route("api/deletesoru/{id}")]
        public IHttpActionResult DeleteSoru(int id)
        {
            var soru = db.Soru.Find(id);
            if (soru == null)
            {
                return NotFound();
            }

            db.Soru.Remove(soru);
            db.SaveChanges();

            return Ok();
        }
        #endregion

        #region Cevap
        [HttpGet]
        [Route("api/cevapliste")]
        public List<ViewModel.Cevap> CevapListe(int soruId)
        {
            List<ViewModel.Cevap> liste = db.Cevap.Where(x => x.SoruId == soruId)
                .Select(x => new ViewModel.Cevap()
                {
                    CevapId = x.CevapId,
                    CevapIcerik = x.CevapIcerik,
                    Tarih = x.Tarih,
                    KullaniciId = x.KullaniciId,
                    SoruId = x.SoruId
                }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/getcevap/{soruId}")]
        public IHttpActionResult GetCevap(int soruId, int cevapId)
        {
            var cevap = db.Cevap.FirstOrDefault(x => x.SoruId == soruId && x.CevapId == cevapId);
            if (cevap == null)
            {
                return NotFound();
            }

            var cevapModel = new ViewModel.Cevap();
            cevapModel.CevapId = cevap.CevapId;
            cevapModel.CevapIcerik = cevap.CevapIcerik;
            cevapModel.Tarih = cevap.Tarih;
            cevapModel.KullaniciId = cevap.KullaniciId;
            cevapModel.SoruId = cevap.SoruId;

            return Ok(cevapModel);
        }

        [HttpGet]
        [Route("api/cevaplistebykullaniciid/{KullaniciId}")]

        public List<ViewModel.Cevap> CevapListeByKullaniciId(int KullaniciId)
        {
            List<ViewModel.Cevap> liste = db.Cevap.Where(s => s.KullaniciId == KullaniciId).Select(x => new ViewModel.Cevap()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                SoruId = x.SoruId,
                Tarih = x.Tarih,
                KullaniciId = x.Kullanici.KullaniciId,
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/cevapbyid/{cevapId}")]

        public ViewModel.Cevap CevapById(int cevapId)
        {
            ViewModel.Cevap kayit = db.Cevap.Where(s => s.CevapId == cevapId).Select(x => new ViewModel.Cevap()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                SoruId = x.SoruId,
                Tarih = x.Tarih,
                KullaniciId = x.Kullanici.KullaniciId,

            }).SingleOrDefault();

            return kayit;
        }
        [HttpPost]
        [Route("api/postcevap")]
        public IHttpActionResult PostCevap(int soruId, ViewModel.Cevap cevap, string kullaniciEmail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kullanici = db.Kullanici.FirstOrDefault(k => k.Eposta == kullaniciEmail);
            if (kullanici == null)
            {
                return BadRequest("Kullanıcı bulunamadı.");
            }

            var yeniCevap = new sorucevapuyg.Models.Cevap();
            yeniCevap.CevapIcerik = cevap.CevapIcerik;
            yeniCevap.KullaniciId = kullanici.KullaniciId;
            yeniCevap.SoruId = soruId;
            yeniCevap.Tarih = DateTime.Now;

            db.Cevap.Add(yeniCevap);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/putcevap")]
        public IHttpActionResult PutCevap(int id, ViewModel.Cevap soruModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cevap = db.Cevap.Find(id);
            if (cevap == null)
            {
                return NotFound();
            }



            cevap.CevapIcerik = cevap.CevapIcerik;
            cevap.Tarih = DateTime.Now;

            db.Entry(cevap).State = EntityState.Modified;
            db.SaveChanges();

            return Ok();
        }




        #endregion

        #region Kullanici
        [HttpGet]
        [Route("api/kullaniciliste")]
        public List<KullaniciModel> KullaniciListe()
        {
            List<KullaniciModel> liste = db.Kullanici.Select(x => new ViewModel.KullaniciModel()
            {
                KullaniciId = x.KullaniciId,
                KullaniciAdi = x.KullaniciAdi,
                Eposta = x.Eposta,
                Sifre = x.Sifre,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kullanicibyid/{KullaniciId}")]

        public ViewModel.KullaniciModel KullaniciById(int KullaniciId)
        {
            ViewModel.KullaniciModel kayit = db.Kullanici.Where(s => s.KullaniciId == KullaniciId).Select(x => new ViewModel.KullaniciModel()
            {
                KullaniciId = x.KullaniciId,
                KullaniciAdi = x.KullaniciAdi,
                Eposta = x.Eposta,
                Sifre = x.Sifre,

            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/kullaniciekle")]
        public SonucModel KullaniciEkle(KullaniciModel model)
        {
            if (db.Kullanici.Count(s => s.KullaniciAdi == model.KullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanıcı Kayıtlıdı";
                return sonuc;

            }

            Kullanici yeniKullanici = new Kullanici();
            yeniKullanici.KullaniciAdi = model.KullaniciAdi;
            yeniKullanici.Eposta = model.Eposta;
            yeniKullanici.Sifre = model.Sifre;
            yeniKullanici.KullaniciAdmin = model.KullaniciAdmin;


            db.Kullanici.Add(yeniKullanici);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanıcı Eklendi";
            return sonuc;

        }

        [HttpPut]
        [Route("api/kullaniciduzenle")]
        public IHttpActionResult KullaniciDuzenle(int id, ViewModel.KullaniciModel kullaniciModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kullanici = db.Kullanici.Find(id);
            if (kullanici == null)
            {
                return NotFound();
            }



            kullanici.KullaniciId = kullanici.KullaniciId;
            kullanici.KullaniciAdi = kullanici.KullaniciAdi;

            db.Entry(kullanici).State = EntityState.Modified;
            db.SaveChanges();

            return Ok();
        }





        #endregion



    }

}
