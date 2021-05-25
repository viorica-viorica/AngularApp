import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { CarouselModule, WavesModule, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';
import { HotelsComponent } from './Components/hotels/hotels.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MyRestaurantsComponent } from './Components/my-restaurants/my-restaurants.component';
import { MyHotelsComponent } from './Components/my-hotels/my-hotels.component';
import { CarouselComponent } from './Components/hotels/carousel/carousel.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IgxButtonModule, IgxToggleModule } from "igniteui-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Components/home/home.component';
import { GalleryComponent } from './Components/home/gallery/gallery.component';
import { MapComponent } from './Components/home/map/map.component';
import { ToDoComponent } from './Components/home/to-do/to-do.component';
import { StayComponent } from './Components/home/stay/stay.component';
import { EatComponent } from './Components/home/eat/eat.component';
import { ItemsCarouselComponent } from './Components/home/items-carousel/items-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    MyProfileComponent,
    RestaurantsComponent,
    HotelsComponent,
    NavbarComponent,
    MyRestaurantsComponent,
    MyHotelsComponent,
    CarouselComponent,
    HomeComponent,
    GalleryComponent,
    MapComponent,
    ToDoComponent,
    StayComponent,
    EatComponent,
    ItemsCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatSlideToggleModule,
    IgxButtonModule,
    IgxToggleModule,
    NgbModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CarouselModule,
    WavesModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
