import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotosService {

  constructor(
    private http: HttpClient
  ) { }

  public getPhotos(): Observable<any[]>{
    return 
  }
}
