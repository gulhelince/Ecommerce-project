
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from './productmodal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  randomProducts: product[] = []; // Rastgele seçilen ürünler

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.filterTopProductsByCategory(); // İlk 4 ürün
    this.loadRandomProducts(); // Rastgele dört ürünü seçer
  }

  bannerImages = [
    {
      id:1,
      img:'../../assets/images/img1.jpg',
    },
    {
      id:2,
      img:'../../assets/images/img2.jpg',
    },
    {
      id:3,
      img:'../../assets/images/img3.jpg',
    }
  ]


// Rastgele dört ürün seçme fonksiyonu
loadRandomProducts(): void {
  if (this.data.length > 0) {
    const shuffled = [...this.data].sort(() => 0.5 - Math.random()); // Ürünleri karıştırır
    this.randomProducts = shuffled.slice(0, 4); // İlk dört ürünü seçer
  }
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
