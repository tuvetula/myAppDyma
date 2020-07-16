// Modules natifs
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Routing
import { AppRoutingModule } from "./app-routing.module";

//Components
import { AppComponent } from "./app.component";
import { CoreModule } from './shared/modules/core.module';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { reducersMap } from './shared/store';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot(reducersMap),
    // EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'ngrx photos',
      logOnly: environment.production
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
