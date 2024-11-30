import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../product-view/productmodal';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // showproduct:any=[];
  // public totalamount : number=0;
  // public addressform = false;
  // myform:FormGroup|any;

  // constructor(private api:ApiService) { }

  // ngOnInit(): void {
  //   this.api.products().subscribe(res=>{
  //     this.showproduct = res;
  //     this.totalamount = this.api.calculateprice();
  //     console.log("total amt is",this.totalamount);
  //   })
  //   //form
  //   this.myform = new FormGroup({
  //     email:new FormControl ('',Validators.required),
  //     name:new FormControl ('',Validators.required),
  //     mobile:new FormControl ('',Validators.required),
  //     address:new FormControl ('',Validators.required),
  //   })
  // }

  // deleteitem(item:product){
  //   this.api.removecartitem(item)
  // }

  // Empty(){
  //   this.api.removeallitems();
  // }

  // cancel(){
  //   this.addressform = false;
  //   this.myform.reset();
  // }

  // onsubmit(){
  //   this.myform.value;
  //   console.log(this.myform.value);
  //   this.myform.reset();
  // }


  // showproduct: any[] = [];
  // public totalamount: number = 0;
  // public addressform = false;
  // myform: FormGroup | any;

  // constructor(private api: ApiService) {}

  // ngOnInit(): void {
  //   this.api.products().subscribe(res => {
  //     this.showproduct = res.map((item: any) => ({
  //       ...item,
  //       quantity: 1 // Başlangıç miktarını 1 olarak ayarlıyoruz
  //     }));
  //     this.updateTotalAmount();
  //   });

  //   // Form
  //   this.myform = new FormGroup({
  //     email: new FormControl('', Validators.required),
  //     name: new FormControl('', Validators.required),
  //     mobile: new FormControl('', Validators.required),
  //     address: new FormControl('', Validators.required)
  //   });
  // }

  // // Ürünü silme
  // deleteitem(item: any): void {
  //   this.api.removecartitem(item);
  //   this.showproduct = this.showproduct.filter((i) => i.id !== item.id); // Sepet listesinden çıkar
  //   this.updateTotalAmount();
  // }

  // // Sepeti boşaltma
  // Empty(): void {
  //   this.api.removeallitems();
  //   this.showproduct = [];
  //   this.totalamount = 0;
  // }

  // // Formu iptal etme
  // cancel(): void {
  //   this.addressform = false;
  //   this.myform.reset();
  // }

  // // Formu gönderme
  // onsubmit(): void {
  //   console.log(this.myform.value);
  //   this.myform.reset();
  // }

  // // Miktar artırma
  // increaseQuantity(item: any): void {
  //   item.quantity += 1;
  //   this.updateTotalAmount();
  // }

  // // Miktar azaltma
  // decreaseQuantity(item: any): void {
  //   if (item.quantity > 1) {
  //     item.quantity -= 1;
  //     this.updateTotalAmount();
  //   }
  // }

  // // Toplam tutarı güncelleme
  // updateTotalAmount(): void {
  //   this.totalamount = this.showproduct.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // }
  
  showproduct: any[] = [];
  public totalamount: number = 0;
  public addressform = false;
  myform: FormGroup | any;

  // Adım ilerleme durumu
  currentStep = 1; // 1: Shopping Cart, 2: Checkout Details, 3: Order Complete

  goToStep(stepNumber: number) {
    this.currentStep = stepNumber; // Geçilen adımı ayarlayın
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.products().subscribe((res) => {
      this.showproduct = res.map((item: any) => ({
        ...item,
        quantity: 1, // Başlangıç miktarını 1 olarak ayarlıyoruz
      }));
      this.updateTotalAmount();
    });

    // Form
    // this.myform = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   name: new FormControl('', Validators.required),
    //   mobile: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('^[0-9]+$'),
    //   ]),
    //   address: new FormControl('', Validators.required),
    // });

    // Form
    this.myform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      address: new FormControl('', Validators.required),
      paymentMethod: new FormControl('card', Validators.required),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$'),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$'),
      ]),
      cvc: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]),
    });


  }

  // Adımları yönetme
  goToNextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

    // Formu gönderme
  onsubmit(): void {
      if (this.myform.valid) {
        console.log('Order Submitted:', this.myform.value);
        this.myform.reset();
        this.currentStep = 3;
      }
    }

  // Ürünü silme
  deleteitem(item: any): void {
    this.api.removecartitem(item);
    this.showproduct = this.showproduct.filter((i) => i.id !== item.id); // Sepet listesinden çıkar
    this.updateTotalAmount();
  }

  // Sepeti boşaltma
  Empty(): void {
    this.api.removeallitems();
    this.showproduct = [];
    this.totalamount = 0;
    this.currentStep = 1; // Baştan başla
  }

  // Formu iptal etme
  cancel(): void {
    this.addressform = false;
    this.myform.reset();
  }

  // Formu gönderme
  // onsubmit(): void {
  //   if (this.myform.valid) {
  //     console.log(this.myform.value);
  //     this.myform.reset();
  //     this.currentStep = 3; // Sipariş tamamlandı adımına geç
  //   }
  // }

  // Miktar artırma
  increaseQuantity(item: any): void {
    item.quantity += 1;
    this.updateTotalAmount();
  }

  // Miktar azaltma
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateTotalAmount();
    }
  }

  // Toplam tutarı güncelleme
  updateTotalAmount(): void {
    this.totalamount = this.showproduct.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

   // Ödeme yöntemi değişikliği
   updatePaymentMethod(method: string): void {
    this.myform.patchValue({ paymentMethod: method });
    if (method === 'paypal') {
      this.myform.controls['cardNumber'].clearValidators();
      this.myform.controls['expirationDate'].clearValidators();
      this.myform.controls['cvc'].clearValidators();
    } else {
      this.myform.controls['cardNumber'].setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{16}$'),
      ]);
      this.myform.controls['expirationDate'].setValidators([
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$'),
      ]);
      this.myform.controls['cvc'].setValidators([
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]);
    }
    this.myform.controls['cardNumber'].updateValueAndValidity();
    this.myform.controls['expirationDate'].updateValueAndValidity();
    this.myform.controls['cvc'].updateValueAndValidity();
  }
  
}
