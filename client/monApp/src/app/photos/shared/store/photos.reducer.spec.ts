import * as photosReducer from './photos.reducer';
import * as photosAction from './photos.action';
import { PhotoModel } from '../models/photos.model';

describe('PHOTOS REDUCER' , () => {
    it('should return initialState' , () => {
        const initialState = photosReducer.initialState;
        const action: any = {};
        const newState = photosReducer.photosReducer(undefined,action);
        expect(newState).toEqual(initialState);
    });
    it('should return SET_FILTER' , () => {
        const initialState = photosReducer.initialState;
        const action = new photosAction.SetFilter('filter');
        const newState = photosReducer.photosReducer(initialState,action);
        expect(newState.filter).toEqual('filter');
    });
    it('should return FETCH_PHOTOS_SUCCESS' , () => {
        const initialState = photosReducer.initialState;
        const payload: PhotoModel[] = [{url:"https://www.test.fr"},{url:"https://www.test.fr"}]
        const action = new photosAction.FetchPhotosSuccess(payload);
        const newState = photosReducer.photosReducer(initialState,action);
        expect(newState.photos).toEqual(payload);
    });
})