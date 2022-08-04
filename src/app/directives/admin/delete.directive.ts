import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private productService: ProductService,
    private spinner:NgxSpinnerService
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

    @Output() callBack:EventEmitter<any>= new EventEmitter();

    @HostListener("click")//Bu directive'in kullanıldığı dom nesnesine tıklama olayı gerçekleştirildiğinde metod tetiklenecektir.
    async onClick(){
      //buraya spinner gelecek. BaseComponent oluşturmayı unutma.
      const td:HTMLTableCellElement=this.element.nativeElement;
      await this.productService.delete(this.id);
      $(td.parentElement).fadeOut(1000,()=>{
        this.callBack.emit();
      });
    }


}
