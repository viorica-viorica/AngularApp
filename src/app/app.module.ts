import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IgxButtonModule, IgxToggleModule } from "igniteui-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Components/home/home.component';
import { GalleryComponent } from './Components/home/gallery/gallery.component';
import { MapComponent } from './Components/home/map/map.component';
import { ToDoComponent } from './Components/home/to-do/to-do.component';
import { StayComponent } from './Components/home/stay/stay.component';
import { EatComponent } from './Components/home/eat/eat.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { HotelServiceService } from './Services/hotel-service/hotel-service.service';
import { ReservationServiceService } from './Services/reservation-service/reservation-service.service';
import { RestaurantServiceService } from './Services/restaurant-service/restaurant-service.service';
import { TouristicObjectiveServiceService } from './Services/touristic-objective-service/touristic-objective-service.service';
import { UsersServiceService } from './Services/users-service/users-service.service';
import { ToastrModule } from 'ngx-toastr';
import { AddHotelComponent } from './Components/admin-page/admin-hotels/add-hotel/add-hotel.component';
import { EditHotelComponent } from './Components/admin-page/admin-hotels/edit-hotel/edit-hotel.component';
import { ViewHotelsComponent } from './Components/admin-page/admin-hotels/view-hotels/view-hotels.component';
import { AddRestaurantComponent } from './Components/admin-page/admin-restaurants/add-restaurant/add-restaurant.component';
import { ViewRestaurantsComponent } from './Components/admin-page/admin-restaurants/view-restaurants/view-restaurants.component';
import { EditRestaurantComponent } from './Components/admin-page/admin-restaurants/edit-restaurant/edit-restaurant.component';
import { AddObjectiveComponent } from './Components/admin-page/admin-touristic-objective/add-objective/add-objective.component';
import { EditObjectiveComponent } from './Components/admin-page/admin-touristic-objective/edit-objective/edit-objective.component';
import { ViewObjectivesComponent } from './Components/admin-page/admin-touristic-objective/view-objectives/view-objectives.component';
import { AdminReservationsComponent } from './Components/admin-page/admin-reservations/admin-reservations.component';
import { LoginComponent } from './Components/login-register/login/login.component';
import { RegisterComponent } from './Components/login-register/register/register.component';
import { ForgottenPasswordComponent } from './Components/login-register/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './Components/login-register/reset-password/reset-password.component';
import { PasswordConfirmationValidatorService } from './Services/password-service/password-confirmation-validator.service';
import { TouristicObjectivesComponent } from './Components/touristic-objectives/touristic-objectives.component';
import { ScheduleATripComponent } from './Components/home/map/schedule-a-trip/schedule-a-trip.component';

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
    AdminPageComponent,
    AddHotelComponent,
    EditHotelComponent,
    ViewHotelsComponent,
    AddRestaurantComponent,
    ViewRestaurantsComponent,
    EditRestaurantComponent,
    AddObjectiveComponent,
    EditObjectiveComponent,
    ViewObjectivesComponent,
    AdminReservationsComponent,
    LoginComponent,
    RegisterComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    TouristicObjectivesComponent,
    ScheduleATripComponent
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
    ReactiveFormsModule,
    MatSlideToggleModule,
    IgxButtonModule,
    IgxToggleModule,
    NgbModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CarouselModule,
    WavesModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [
    HotelServiceService,
    ReservationServiceService,
    RestaurantServiceService,
    TouristicObjectiveServiceService,
    UsersServiceService,
    PasswordConfirmationValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
