// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/shared/api.service';
// import { product } from './productmodal';
// import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';


// @Component({
//   selector: 'app-product-view',
//   templateUrl: './product-view.component.html',
//   styleUrls: ['./product-view.component.css'],
  
  
// })
// export class ProductViewComponent implements OnInit {

  
  
//   data:any|product[]
//   constructor(private api:ApiService) { }

//   ngOnInit(): void {
//     this.displayproducts();
//   }

//   displayproducts(){
//     this.api.getProduct().subscribe(res=>{
//       this.data = res;
//       console.log(res);
//     })
//   }

//   addtocart(item:product){
//     this.api.addtocart(item);
//   }

//   removeitem(item:product){
//     this.api.removecartitem(item);
//   }

  

// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from './productmodal';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  
  // data: any | product[] = [];
  // pagedProducts: product[] = [];
  // pageSize = 12; // Varsayılan sayfa boyutu
  // currentPage = 0;

  // constructor(private api: ApiService) {}

  // ngOnInit(): void {
  //   this.displayproducts();
  // }

  // displayproducts(): void {
  //   this.api.getProduct().subscribe((res) => {
  //     this.data = res;
  //     this.updatePagedProducts();
  //   });
  // }

  // updatePagedProducts(): void {
  //   const startIndex = this.currentPage * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.pagedProducts = this.data?.products.slice(startIndex, endIndex);
  // }

  // onPageChange(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex;
  //   this.updatePagedProducts();
  // }

  // addtocart(item: product): void {
  //   this.api.addtocart(item);
  // }

  // removeitem(item: product): void {
  //   this.api.removecartitem(item);
  // }

  // data: any | product[] = [];
  // pagedProducts: product[] = [];
  // pageSize = 12; // Varsayılan sayfa boyutu
  // currentPage = 0;
  // cartItems: product[] = []; // Sepetteki ürünleri tutmak için

  // constructor(private api: ApiService) {}

  // ngOnInit(): void {
  //   this.displayproducts();
  // }

  // displayproducts(): void {
  //   this.api.getProduct().subscribe((res) => {
  //     this.data = res;
  //     this.updatePagedProducts();
  //   });
  // }

  // updatePagedProducts(): void {
  //   const startIndex = this.currentPage * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.pagedProducts = this.data?.products.slice(startIndex, endIndex);
  // }

  // onPageChange(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  //   this.currentPage = event.pageIndex;
  //   this.updatePagedProducts();
  // }

  // addtocart(item: product): void {
  //   const isInCart = this.cartItems.some((cartItem) => cartItem.id === item.id);

  //   if (!isInCart) {
  //     this.api.addtocart(item);
  //     this.cartItems.push(item); // Ürünü sepete ekle
  //     console.log(`${item.title} sepete eklendi.`);
  //   } else {
  //     console.log(`${item.title} zaten sepette mevcut.`);
  //   }
  // }

  // removeitem(item: product): void {
  //   this.api.removecartitem(item);
  //   this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id); // Sepetten çıkar
  //   console.log(`${item.title} sepetten kaldırıldı.`);
  // }

  data: product[] = []; // Tüm ürünler
  pagedProducts: product[] = []; // Sayfalama yapılan ürünler
  categories = ['All', 'beauty', 'fragrances', 'furniture', 'groceries']; // Kategoriler
  selectedCategory = 'All'; // Varsayılan kategori
  cartItems: product[] = []; // Sepetteki ürünler
  pageSize = 12; // Varsayılan sayfa boyutu
  currentPage = 0; // Varsayılan sayfa
  totalProducts = 0; // Ürünlerin toplam sayısı
  selectedSortOption = 'none'; // Varsayılan sıralama seçeneği (none, asc, desc)

  selectedCategoryProducts: product[] = []; // Seçilen kategoriden ilk 4 ürün

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.filterTopProductsByCategory(); // İlk 4 ürün
  }

  // Rastgele ürün seçmek için yardımcı fonksiyon
getRandomProducts(products: product[], count: number): product[] {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); // İlk `count` kadar ürün al
}

// Kategoriye göre 4 ürün filtreleme
filterTopProductsByCategory(): void {
  if (this.selectedCategory === 'All') {
    // "All" seçiliyse rastgele 4 ürün al
    this.selectedCategoryProducts = this.getRandomProducts(this.data, 4);
  } else {
    // Seçilen kategoriye göre 4 ürün filtrele
    this.selectedCategoryProducts = this.data
      .filter((product) => product.category === this.selectedCategory)
      .slice(0, 4);
  }
}

  // Tüm ürünleri yükleme
  loadProducts(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.data = res.products || [];
      this.totalProducts = this.data.length;
      this.updatePagedProducts();
      this.filterTopProductsByCategory(); // İlk başta "All" için rastgele ürün seç
    });
  }

  // Ürünleri kategori, sıralama ve sayfalama bazında güncelleme
  updatePagedProducts(): void {
    let filteredData = this.data;

    // Kategoriye göre filtreleme
    if (this.selectedCategory !== 'All') {
      filteredData = this.data.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Fiyata göre sıralama
    if (this.selectedSortOption === 'asc') {
      filteredData.sort((a, b) => a.price - b.price); // Artan sırayla
    } else if (this.selectedSortOption === 'desc') {
      filteredData.sort((a, b) => b.price - a.price); // Azalan sırayla
    }

    // Sayfalama işlemi
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = filteredData.slice(startIndex, endIndex);
    this.totalProducts = filteredData.length; // Toplam ürün sayısını güncelle
  }

  // Sayfa değiştiğinde tetiklenen işlem
  onPageChange(event: any): void {
    this.pageSize = event.pageSize; // Sayfa boyutunu güncelle
    this.currentPage = event.pageIndex; // Geçerli sayfayı güncelle
    this.updatePagedProducts(); // Sayfa içeriğini güncelle
  }

  // Ürün kategorisine göre filtreleme
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 0; // İlk sayfaya dön
    this.updatePagedProducts();
    this.filterTopProductsByCategory(); // Yeni fonksiyon çağrılıyor
  }

  // Fiyata göre sıralama
  sortByPrice(order: string): void {
    this.selectedSortOption = order; // Sıralama düzenini güncelle
    this.updatePagedProducts(); // Ürünleri yeniden güncelle
  }

  // Ürünü sepete ekleme
  addtocart(item: product): void {
    const isInCart = this.cartItems.some((cartItem) => cartItem.id === item.id);

    if (!isInCart) {
      this.api.addtocart(item)
        this.cartItems.push(item);
        console.log(`${item.title} sepete eklendi.`);
     
    } else {
      console.log(`${item.title} zaten sepette mevcut.`);
    }
  }

  // Sepetten ürünü kaldırma
  removeitem(item: product): void {
    this.api.removecartitem(item);
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      console.log(`${item.title} sepetten kaldırıldı.`);
    
  }
}
