import * as photosSelectors from "./photos.selectors";
import { State } from "@ngrx/store";
import { PhotosState } from "./photos.reducer";

const state: {
  photos: PhotosState;
} = {
  photos: {
    filter: null,
    photos: null,
  },
};
describe("PHOTOS SELECTORS", () => {
  describe("photosFilterSelector", () => {
    it("should return state.photos.filter", () => {
      const mockState = {
        ...state,
        photos: { ...state.photos, filter: "filter" },
      };
      expect(photosSelectors.photosFilterSelector(mockState)).toEqual(
        mockState.photos.filter
      );
    });
    it("should return null", () => {
      const mockState = state;
      expect(photosSelectors.photosFilterSelector(mockState)).toEqual(null);
    });
  });
  describe("photosPhotosSelector", () => {
    it("should return state.photos.photos", () => {
      const mockState = {
        ...state,
        photos: { ...state.photos, photos:[
            {url: "https://www.test.fr"},{url: "https://www.test1.fr"},{url: "https://www.test2.fr"},
        ] },
      };
      expect(photosSelectors.photosPhotosSelector(mockState)).toEqual(
        mockState.photos.photos
      );
    });
    it("should return null", () => {
      const mockState = state;
      expect(photosSelectors.photosPhotosSelector(mockState)).toEqual(null);
    });
  });
});
