import { AdminHotelsComponent } from './Components/admin-page/admin-hotels/admin-hotels.component';
import { AdminUsersComponent } from './Components/admin-page/admin-users/admin-users.component';
import { AdminRestaurantsComponent } from './Components/admin-page/admin-restaurants/admin-restaurants.component';
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

const routes: Routes = [
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
    component: LoginRegisterComponent
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
    component: AdminPageComponent
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent
  },
  {
    path: 'admin-restaurants',
    component: AdminRestaurantsComponent
  },
  {
    path: 'admin-hotels',
    component: AdminHotelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
