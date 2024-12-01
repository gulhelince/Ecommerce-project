import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../components/product-view/productmodal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

// Bu değişken, sepetin içindeki ürünleri tutar. Başlangıçta boş bir dizi.
public cartitemlist : any=[];

// Bu değişken, ürünleri "BehaviorSubject" olarak tutar ve bu sayede ürünler her güncellenmede abonelere (subscriber) anında bildirilir.
public productlist = new BehaviorSubject<any>([])

constructor(private http: HttpClient) {}

// Ürünleri almak için HTTP isteği yapılır. getProduct() fonksiyonu, API'den ürünlerin listesine erişir.
getProduct(){
    return this.http.get<product[]>("https://dummyjson.com/products")
}

// Belirli bir ürünü almak için API'ye yapılan GET isteği. 'id' parametresi ile ürünün detaylarına erişilir.
getproductbyid(id:string){
    return this.http.get("https://dummyjson.com/products/"+id)
}

// Sepete ürün ekler. Verilen 'data' parametresi sepete eklenen üründür.
// Ürün, 'cartitemlist' dizisine eklenir ve 'productlist' (BehaviorSubject) güncellenir.
addtocart(data: product){
    this.cartitemlist.push(data);   // Ürünü sepete ekle
    this.productlist.next(this.cartitemlist);  // Sepeti güncelle
    console.log(this.cartitemlist)  // Konsola sepeti yazdır
}

// Ürünlerin gözlemlenebilmesini sağlar. 'productlist' bir Observable olduğu için abone olunabilir.
products(){
    return this.productlist.asObservable();  // 'productlist' Observable olarak döndürülür.
}

// Sepetten bir öğeyi kaldırır. 'data' parametresi, çıkarılacak ürünü belirtir.
// Sepetteki ürünler arasında, verilen 'id' ile eşleşen ürün bulunarak silinir.
removecartitem(data: product){
    this.cartitemlist.map((a: product, index: product)=>{  // Her ürünü kontrol et
        if(data.id === a.id){  // Eğer id'ler eşleşirse
            this.cartitemlist.splice(index, 1)  // Ürünü diziden çıkar
        }
    })
    this.productlist.next(this.cartitemlist);  // Sepeti güncelle
}

// Sepetteki tüm ürünlerin toplam fiyatını hesaplar. 'total' değişkeni her ürünün fiyatını ekler.
calculateprice(){
    let total = 0;
    this.cartitemlist.map((a: any)=>{  // Sepetteki her ürün için
        total += a.price;  // Ürünün fiyatını toplam fiyata ekle
    })
    return total;  // Toplam fiyatı döndür
}

// Sepetteki tüm ürünleri kaldırır. 'cartitemlist' dizisi sıfırlanır ve güncellenmiş liste 'productlist' ile bildirilir.
removeallitems(){
    this.cartitemlist = [];  // Sepeti temizle
    this.productlist.next(this.cartitemlist)  // Sepeti güncelle
}
}

/*
cartitemlist: Sepetteki ürünleri tutan dizi.
productlist: BehaviorSubject kullanılarak sepetin güncel hali her aboneye (subscriber) iletilir. Bu, Angular servislerinde verilerin reaktif olarak yönetilmesini sağlar.
getProduct(): Ürünlerin tümünü API'den çeker ve döndürür.
getproductbyid(id: string): Belirli bir ürünün detaylarını almak için API'ye istek gönderir.
addtocart(data: product): Sepete ürün ekler ve bu güncellemeyi productlist ile abonelere bildirir.
products(): productlist'in bir Observable versiyonunu döndürür. Bu, bileşenlerde veri akışını dinleyebilmek için kullanılır.
removecartitem(data: product): Sepetten belirli bir ürünü çıkarır. Ürün, cartitemlist dizisinden silinir ve ardından güncellenmiş liste abonelere bildirilir.
calculateprice(): Sepetteki tüm ürünlerin fiyatlarını toplayarak toplam tutarı hesaplar.
removeallitems(): Sepetteki tüm ürünleri siler ve productlist'i günceller.
*/
