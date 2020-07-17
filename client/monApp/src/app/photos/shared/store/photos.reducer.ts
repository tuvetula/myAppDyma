import { PhotosService } from '../services/photos.service';
import { Action } from '@ngrx/store';
import { SET_FILTER, PhotosAction, FETCH_PHOTOS_SUCCESS } from './photos.action';

export interface PhotosState {
    photos: any[],
    filter: string
}

export function photosReducer(state: PhotosState , action: PhotosAction):PhotosState{
    switch(action.type){
        case SET_FILTER: {
            return {
                ...state , filter: action.payload
            }
        }
        case FETCH_PHOTOS_SUCCESS: {
            return {
                ...state , photos: action.payload
            }
        }
    }
    return state;
}