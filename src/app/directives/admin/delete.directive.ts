import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService: HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
    ) 
    { 
      const img=_renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style","cursor:pointer;");
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img);
    }
    @Input() id:string;
    @Input() controller:string
    @Output() callBack:EventEmitter<any>= new EventEmitter();

    @HostListener("click")//will be triggered when the click event is performed on the dom object where this directive is used.
    async onClick(){
      
      this.dialogService.openDialog({
        componentType:DeleteDialogComponent,
        data:DeleteState.Yes,
        afterClosed:async ()=>{
          //TODO Spinner
          const td: HTMLTableCellElement = this.element.nativeElement;
          await this.httpClientService.delete({
            controller:this.controller
            //TODO fix don't get the controller information manually as a parameter in the html section.
          },this.id).subscribe(data=>{
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toogle"
            },700,()=>{
              this.callBack.emit();
              this.alertifyService.message("Ürün başarıyla silinmiştir.",{
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.TopRight
            })
          });
        },(errorResponse:HttpErrorResponse)=>{
          this.alertifyService.message("Ürün silinirken hata ile karşılaşıldı",{
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          })
        });   
      }
      });
      
      
    }

}
