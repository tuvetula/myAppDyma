import { NgModule } from "@angular/core";
import { PhotosComponent } from "./photos.component";
import { PhotosRoutingModule } from "./photos-routing.module";
import { LayoutModule } from "../shared/modules/layout.module";
import { PhotosService } from "./shared/services/photos.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { photosReducer } from './shared/store/photos.reducer';
import { PhotosEffects } from './shared/store/photos.effects';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    StoreModule.forFeature("photos", photosReducer),
    EffectsModule.forFeature([PhotosEffects]),
    PhotosRoutingModule,
  ],
  providers: [PhotosService],
})
export class PhotosModule {}
