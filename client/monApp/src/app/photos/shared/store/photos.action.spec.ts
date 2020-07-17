import * as photosAction from "./photos.action";

describe("PHOTOS ACTION", () => {
  describe("SetFilter action", () => {
    it("should create SetFilter action", () => {
      const payload = "test";
      const action = new photosAction.SetFilter(payload);
      expect({ ...action }).toEqual({
        type: photosAction.SET_FILTER,
        payload: payload,
      });
    });
  });
  describe("FetchPhotos action", () => {
    it("should create FetchPhotos action", () => {
      const action = new photosAction.FetchPhotos();
      expect({ ...action }).toEqual({
        type: photosAction.FETCH_PHOTOS,
      });
    });
  });
  describe("FetchPhotosSuccess action", () => {
    it("should create FetchPhotosSuccess action", () => {
      const payload = [
        { url: "http://www.test.com" },
        { url: "http://www.test1.com" },
      ];
      const action = new photosAction.FetchPhotosSuccess(payload);
      expect({ ...action }).toEqual({
        type: photosAction.FETCH_PHOTOS_SUCCESS,
        payload: payload,
      });
    });
  });
});
