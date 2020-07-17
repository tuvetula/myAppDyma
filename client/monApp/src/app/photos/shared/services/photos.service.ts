import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { unsplash } from "../../keys/unsplash.keys";

@Injectable()
export class PhotosService {
  constructor(private http: HttpClient) {}

  public getPictures(filter: string): Observable<unknown> {
    return from(
      unsplash.search
        .photos(filter, 0)
        .then((res: { json: () => any }) => res.json())
    ).pipe(
      map((response: any) =>
        response.results.map((res: { urls: string }) => {
          return { url: res.urls.small };
        })
      )
    );
  }
}
