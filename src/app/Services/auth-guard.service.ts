import { AuthService } from './auth.service';
import { UsersModel } from './../Models/users-model/users-model.model';
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(public authUserService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user: UsersModel = this.authUserService.getLoggedInUser()!;
    const path: string = route.routeConfig!.path!;

    if (
      this.isUserLoggedIn(user) &&
      (path === "login" || path === "register")
    ) {
      this.router.navigate(["/home"]);
      return false;
    }

    if (!this.isUserLoggedIn(user) && path !== "login" && path !== "register") {
      this.router.navigate(["login-register/login"]);
      return false;
    }

    if (
      route.data.expectedRoles !== undefined &&
      !route.data.expectedRoles.includes(user.role)
    ) {
      this.router.navigate(["/home"]);
      return false;
    }

    return true;
  }

  private isUserLoggedIn(user: UsersModel): Boolean {
    return user.username.length > 1;
  }
}
