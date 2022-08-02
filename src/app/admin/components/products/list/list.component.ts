import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource:MatTableDataSource<List_Product>=null;

  ngOnInit(): void {
  }

}


// p.Id,
//                 p.Name,
//                 p.Stock,
//                 p.Price,
//                 p.CreatedDate,
//                 p.UpdatedDate
