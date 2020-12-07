import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {


  constructor(private storage: AngularFireStorage) { }

  public uploadFile(fileName: string, data: any,meta:any) {
    return this.storage.upload(fileName, data, {customMetadata:meta});
  }

  public linkToPublicFile(fileName: string) {
    console.log('filename:' + fileName);
    return this.storage.ref(fileName);
  }
  
}
