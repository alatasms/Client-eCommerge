import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private productService: ProductService, private alertifyService:AlertifyService ) { }

  ngOnInit(): void {
  }
  
  create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){
    const create_Product:Create_Product=new Create_Product();
    create_Product.name=name.value;
    create_Product.stock=parseInt(stock.value);
    create_Product.price=parseFloat(price.value);

    this.productService.create(create_Product, ()=>{
      this.alertifyService.message("Ürün başarıyla eklendi",{messageType:MessageType.Success, dismissOthers:true,position:Position.TopRight})
    },  errorMessage=>{
      this.alertifyService.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });

  }

}
