import { PhotosService } from '../services/photos.service';
import { Action } from '@ngrx/store';
import { SET_FILTER, PhotosAction, FETCH_PHOTOS_SUCCESS } from './photos.action';
import { PhotoModel } from '../models/photos.model';

export interface PhotosState {
    photos: PhotoModel[],
    filter: string
}

export const initialState = {
    photos: null,
    filter: null
}

export function photosReducer(state: PhotosState = initialState , action: PhotosAction):PhotosState{
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