import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private httpClientService:HttpClientService, private alertifyService: AlertifyService, private customToastrService:CustomToastrService){

  }
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFile(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData:FormData=new FormData();

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath);
      })
    }



    this.httpClientService.post({
      controller :this.options.controller,
      action: this.options.action,
      queryString:this.options.queryString,
      headers : new HttpHeaders({"responseType": "blob"})
    },fileData).subscribe(data=>{
      
        const SUCCESS_MESSAGE:string="Dosyalar başarıyla yüklenmiştir."


        if (this.options.isAdmin) 
        {
          this.alertifyService.message(SUCCESS_MESSAGE,{
            dismissOthers:true,
            messageType:MessageType.Success,
            position:Position.TopRight
          })
        }else{
          this.customToastrService.message(SUCCESS_MESSAGE,"Başarılı",{
            toastrMessageType:ToastrMessageType.Success,
            position:ToastrPosition.TopRight
          })

        }
    },(errorResponse:HttpErrorResponse)=>{
      const FAILED_MESSAGE:string="Dosyalar yüklenirken bir hata oluştu";


      if (this.options.isAdmin) 
      {
        this.alertifyService.message(FAILED_MESSAGE,{
          dismissOthers:true,
          messageType:MessageType.Warning,
          position:Position.TopRight
        })
      }else{
        this.customToastrService.message(FAILED_MESSAGE,"Başarısız",{
          toastrMessageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })

      }
    });
  }

  

}

export class FileUploadOptions{
  controller? :string;
  action? : string;
  queryString?: string;
  explanation? :string;
  accept?: string;
  isAdmin? : boolean=false;
}
