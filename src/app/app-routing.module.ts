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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
