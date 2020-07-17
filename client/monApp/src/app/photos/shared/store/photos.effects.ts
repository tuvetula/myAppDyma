import { Effect, Actions, ofType } from "@ngrx/effects";
import { PhotosService } from "../services/photos.service";
import {
  FETCH_PHOTOS,
  SET_FILTER,
  FETCH_PHOTOS_SUCCESS,
  SetFilter,
  FetchPhotos,
} from "./photos.action";
import { map, switchMap, take, tap, debounceTime } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { photosFilterSelector } from "./photos.selectors";
import { State } from "src/app/shared/store";
import { empty } from "rxjs";

@Injectable()
export class PhotosEffects {
    @Effect() setFilter$ = this.actions$.pipe(
      ofType(SET_FILTER),
      map((action: SetFilter) => action.payload),
      debounceTime(1000),
      map((filter: string) => {
        return new FetchPhotos();
      })
    );

    @Effect({dispatch: false}) fetchPhotos$ = this.actions$.pipe(
      ofType(FETCH_PHOTOS),
      switchMap(() => {
        return this.store.pipe(select(photosFilterSelector), take(1));
      }),
      tap((filter: string) => console.log("search ", filter)),
    );
    @Effect() fetchPhotosSuccess$ = this.actions$.pipe(
        ofType(FETCH_PHOTOS_SUCCESS),

    );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private photosService: PhotosService
  ) {}
}
