import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private alertifySerice:AlertifyService) { }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource:MatTableDataSource<List_Product>=null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts(){
    const allProducts:{totalCount:number;products:List_Product[]}= await this.productService.read(this.paginator? this.paginator.pageIndex:0,this.paginator? this.paginator.pageSize:5,()=>{
      this.alertifySerice.message("Veriler Listelendi",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    },errorMessage=>this.alertifySerice.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.TopRight
    }))

    this.dataSource=new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length=allProducts.totalCount;
    
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit(){
    await this.getProducts();
  }

}


