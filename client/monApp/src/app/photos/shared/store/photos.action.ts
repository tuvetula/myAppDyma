import { Action } from '@ngrx/store';
import { PhotoModel } from '../models/photos.model';

export const SET_FILTER = "[ photos ] set filter";
export const FETCH_PHOTOS = "[ photos ] fetch";
export const FETCH_PHOTOS_SUCCESS = "[ photos ] fetch photos success";

export class SetFilter implements Action {
    readonly type = SET_FILTER;
    constructor(public payload: string){}
}
export class FetchPhotos implements Action {
    readonly type = FETCH_PHOTOS;
}
export class FetchPhotosSuccess implements Action {
    readonly type = FETCH_PHOTOS_SUCCESS;
    constructor (public payload: PhotoModel[]){}
}

export type PhotosAction = SetFilter | FetchPhotos | FetchPhotosSuccess;


