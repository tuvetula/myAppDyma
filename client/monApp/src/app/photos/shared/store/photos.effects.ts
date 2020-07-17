import { Effect, Actions, ofType } from "@ngrx/effects";
import { PhotosService } from "../services/photos.service";
import {
  FETCH_PHOTOS,
  SET_FILTER,
  FETCH_PHOTOS_SUCCESS,
  SetFilter,
  FetchPhotos,
  FetchPhotosSuccess,
} from "./photos.action";
import { map, switchMap, take, tap, debounceTime } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { photosFilterSelector } from "./photos.selectors";
import { State } from "src/app/shared/store";
import { empty } from "rxjs";
import { PhotoModel } from '../models/photos.model';

@Injectable()
export class PhotosEffects {
    @Effect() fetchPhotos$ = this.actions$.pipe(
      ofType(FETCH_PHOTOS),
      debounceTime(1000),
      switchMap(() => this.store.pipe(select(photosFilterSelector), take(1))),
      switchMap((filter: string) => this.photosService.getPictures(filter)),
      map((photos: PhotoModel[]) => new FetchPhotosSuccess(photos))
      )
    ;

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private photosService: PhotosService
  ) {}
}
