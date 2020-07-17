import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotosState } from "./photos.reducer";

export const photosSelector = createFeatureSelector("photos");

export const photosFilterSelector = createSelector(
  photosSelector,
  (photosState: PhotosState) => {
    if (photosState) {
      return photosState.filter;
    } else {
      return null;
    }
  }
);
