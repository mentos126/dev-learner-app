import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedBootstrapModule } from './middlewares/bootstrap-moddule';
import { PositionService } from './game/player/position.service';
import { MenuComponent } from './drawables/menu/menu.component';
import { CookieService } from  'ngx-cookie-service'//  'ngx-cookie-service';
import { ClientSessionService } from './session/client-session.service';
import { Beauty1Component } from './drawables/styles/beauty1/beauty1.component';
import { GameComponent } from './drawables/game/game.component';
import { MapComponent } from './drawables/game/map/map.component';
import { MapProviderService } from './drawables/game/map/map-provider.service';
import { TestComponent } from './drawables/test/test.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { IfComponent } from './drawables/game/editor/if/if.component';
import { DevMapEditorComponent } from './drawables/dev-map-editor/dev-map-editor.component'
import { ProviderService } from './drawables/menu/provider.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    Beauty1Component,
    GameComponent,
    TestComponent,
    IfComponent,
    DevMapEditorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ], // Autorise les éléments importés
  imports: [
    BrowserModule,
    SharedBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [
    MapProviderService,
    PositionService,
    CookieService,
    ClientSessionService,
    ProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
