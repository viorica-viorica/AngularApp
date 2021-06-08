import { ResetPasswordComponent } from './Components/login-register/reset-password/reset-password.component';
import { ForgottenPasswordComponent } from './Components/login-register/forgotten-password/forgotten-password.component';
import { RegisterComponent } from './Components/login-register/register/register.component';
import { LoginComponent } from './Components/login-register/login/login.component';
import { AdminReservationsComponent } from './Components/admin-page/admin-reservations/admin-reservations.component';
import { ViewObjectivesComponent } from './Components/admin-page/admin-touristic-objective/view-objectives/view-objectives.component';
import { EditObjectiveComponent } from './Components/admin-page/admin-touristic-objective/edit-objective/edit-objective.component';
import { AddObjectiveComponent } from './Components/admin-page/admin-touristic-objective/add-objective/add-objective.component';
import { ViewRestaurantsComponent } from './Components/admin-page/admin-restaurants/view-restaurants/view-restaurants.component';
import { EditRestaurantComponent } from './Components/admin-page/admin-restaurants/edit-restaurant/edit-restaurant.component';
import { AddRestaurantComponent } from './Components/admin-page/admin-restaurants/add-restaurant/add-restaurant.component';
import { AddHotelComponent } from './Components/admin-page/admin-hotels/add-hotel/add-hotel.component';
import { AdminPageComponent } from './Components/admin-page/admin-page.component';
import { ItemsCarouselComponent } from './Components/home/items-carousel/items-carousel.component';
import { ToDoComponent } from './Components/home/to-do/to-do.component';
import { EatComponent } from './Components/home/eat/eat.component';
import { StayComponent } from './Components/home/stay/stay.component';
import { MapComponent } from './Components/home/map/map.component';
import { HomeComponent } from './Components/home/home.component';
import { CarouselComponent } from './Components/hotels/carousel/carousel.component';
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { RestaurantsComponent } from './Components/restaurants/restaurants.component';
import { HotelsComponent } from './Components/hotels/hotels.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { MyRestaurantsComponent } from './Components/my-restaurants/my-restaurants.component';
import { MyHotelsComponent } from './Components/my-hotels/my-hotels.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHotelsComponent } from './Components/admin-page/admin-hotels/view-hotels/view-hotels.component';
import { EditHotelComponent } from './Components/admin-page/admin-hotels/edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'hotels',
    component: HotelsComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'login-register',
    component: LoginRegisterComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'my-restaurants',
    component: MyRestaurantsComponent
  },
  {
    path: 'my-hotels',
    component: MyHotelsComponent
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'to-do',
    component: ToDoComponent
  },
  {
    path: 'stay',
    component: StayComponent
  },
  {
    path: 'eat',
    component: EatComponent
  },
  {
    path: 'items-carousel',
    component: ItemsCarouselComponent
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-reservation',
        pathMatch: 'full'
      },
      {
        path: 'admin-reservation',
        component: AdminReservationsComponent
      },
      {
        path: 'view-hotels',
        component: ViewHotelsComponent
      },
      {
        path: 'add-hotel',
        component: AddHotelComponent
      },
      {
        path: 'edit-hotel/:id',
        component: EditHotelComponent
      },
      {
        path: 'add-restaurant',
        component: AddRestaurantComponent
      },
      {
        path: 'edit-restaurant/:id',
        component: EditRestaurantComponent
      },
      {
        path: 'view-restaurants',
        component: ViewRestaurantsComponent
      },
      {
        path: 'add-objective',
        component: AddObjectiveComponent
      },
      {
        path: 'edit-objective/:id',
        component: EditObjectiveComponent
      },
      {
        path: 'view-objectives',
        component: ViewObjectivesComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
