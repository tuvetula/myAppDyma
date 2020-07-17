import { Component, OnInit } from '@angular/core';
import { PhotosState } from './shared/store/photos.reducer';
import { Store, select } from '@ngrx/store';
import { SetFilter, FetchPhotos } from './shared/store/photos.action';
import { Observable } from 'rxjs';
import { PhotoModel } from './shared/models/photos.model';
import { photosPhotosSelector } from './shared/store/photos.selectors'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<PhotoModel[]>

  constructor(
    private store: Store<PhotosState>
  ) { }

  ngOnInit(): void {
    this.photos$ = this.store.pipe(
      select(photosPhotosSelector)
    )
  }

  public applyFilter(filter: string): void {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new FetchPhotos());
  }

}
