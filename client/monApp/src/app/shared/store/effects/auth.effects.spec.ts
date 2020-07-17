import * as AuthActions from "../actions/auth.actions";
import { TestBed } from "@angular/core/testing";
import { AuthEffects } from "./auth.effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../../services/auth.service";
import { hot, cold } from "jasmine-marbles";
import { User } from "../../models/user.model";
import { HttpClientModule } from "@angular/common/http";

describe("AUTH EFFECTS", () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let fakeAuth;
  const user: User = {
    name: "name",
    firstName: "firstName",
    email: "email@test.fr",
    password: "password",
  };

  describe('trySignup effect', () => {
    beforeEach(() => {
        //On crée un spy pour faire ce que l'on veut lorsque la méthode est appellée
        fakeAuth = jasmine.createSpyObj("authService", ["signup"]);
        TestBed.configureTestingModule({
          imports: [
            //Fournit le service httpClient
            HttpClientModule,
            //Fournit le store
            StoreModule.forRoot({}),
            //Simule un faux router
            RouterTestingModule.withRoutes([
              { path: "signin", component: {} as any },
            ]),
          ],
          providers: [
            AuthEffects,
            //Represente le flux d'actions$ du store
            //Permet de fournir un observable que nous pourrons configurer pour simuler n'importe quelles actions
            provideMockActions(() => actions),
            UserService,
            //Faux service AuthService
            {
              provide: AuthService,
              useValue: fakeAuth,
            },
          ],
        });
        effects = TestBed.get(AuthEffects);
      });
    
      it("should return empty", () => {
        fakeAuth.signup.and.returnValue(of(user));
        actions = hot("---a-", { a: new AuthActions.TrySignup(user) });
        const expected = cold("---a-", {
          a: new AuthActions.SignupSuccess({ message: "Inscription réussie" }),
        });
        expect(effects.trySignup$).toBeObservable(expected);
      });
    
      it("should return error", () => {
        fakeAuth.signup.and.throwError({ message: "error" });
        actions = hot("---a-", { a: new AuthActions.TrySignup(user) });
        const expected = cold("---(a|)", {
          a: new AuthActions.SignupError({ message: "error" }),
        });
    
        expect(effects.trySignup$).toBeObservable(expected);
      });
  })
  
});
