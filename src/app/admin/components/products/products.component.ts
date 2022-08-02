import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private htttpClientService:HttpClientService) { }

  ngOnInit(): void {

    // this.htttpClientService.post({
    //   controller:"products"
    // },{
    //   name:"B Product",
    //   stock:10,
    //   price:1000
    // }).subscribe();
    
    // this.htttpClientService.get({
    //   controller:"products"}).subscribe(data=>console.log(data));

      // this.htttpClientService.put({
      //   controller:"products",
      // },{
      //   id:"2b9163f7-9d54-49ff-93c6-ada673802823",
      //   name:"A New Product",
      //   price:3000,
      //   stock:50
      // }).subscribe();

      // this.htttpClientService.delete({
      //   controller:"products"
      // },"58a0890e-e830-4524-b4b0-a4a7d2720f35").subscribe();
  }

}
