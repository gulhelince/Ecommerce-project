import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  public totalamount:number=0;

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.router.navigate(["/"])
      this.api.removeallitems()
    },4000);

    //totalamount coming from api
    this.totalamount = this.api.calculateprice();
  }

}
