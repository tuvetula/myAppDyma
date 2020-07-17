import { Component, OnInit } from '@angular/core';
import { PhotosState } from './shared/store/photos.reducer';
import { Store } from '@ngrx/store';
import { SetFilter } from './shared/store/photos.action';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(
    private store: Store<PhotosState>
  ) { }

  ngOnInit(): void {
  }

  public applyFilter(filter: string): void {
    this.store.dispatch(new SetFilter(filter));
  }

}
