import * as AuthActions from "../actions/auth.actions";
import * as AuthReducers from "../reducers/auth.reducer";
import * as AuthSelectors from "../selectors/auth.selectors";
import { TestBed } from "@angular/core/testing";
import { AuthEffects } from "./auth.effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { Observable, of, empty, EMPTY } from "rxjs";
import { UserService } from "../../services/user.service";
import { StoreModule, MemoizedSelector } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../../services/auth.service";
import { hot, cold } from "jasmine-marbles";
import { User } from "../../models/user.model";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { CredentialModel } from "../../models/credential.model";

describe("AUTH EFFECTS", () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let routerService: Router;
  let store: MockStore;
  let storeTokenSelector: MemoizedSelector<AuthReducers.AuthState, string>;
  const initialState = AuthReducers.initialState;

  //On crée un spy pour faire ce que l'on veut lorsque la méthode est appellée
  let fakeAuth = jasmine.createSpyObj("authService", [
    "signup",
    "signin",
    "refreshToken",
    "initTimer",
  ]);
  let fakeUser = jasmine.createSpyObj("userService", ["getCurrentUser"]);
  const user: User = {
    name: "name",
    firstName: "firstName",
    email: "email@test.fr",
    password: "password",
  };
  const userData = {
    name: "name",
    firstName: "firstName",
    email: "email@test.fr",
  };
  const credentials: CredentialModel = {
    email: "email@test.fr",
    password: "password",
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        //Fournit le service httpClient
        HttpClientModule,
        //Fournit le store
        StoreModule.forRoot({}),
        //Simule un faux router
        RouterTestingModule.withRoutes([
          { path: "", component: {} as any },
          { path: "signin", component: {} as any },
        ]),
      ],
      providers: [
        AuthEffects,
        //Represente le flux d'actions$ du store
        //Permet de fournir un observable que nous pourrons configurer pour simuler n'importe quelles actions
        provideMockActions(() => actions),
        provideMockStore(),
        //Faux service UserService
        {
          provide: UserService,
          useValue: fakeUser,
        },
        //Faux service AuthService
        {
          provide: AuthService,
          useValue: fakeAuth,
        },
      ],
    });
    effects = TestBed.get(AuthEffects);
    routerService = TestBed.get(Router);
    store = TestBed.inject(MockStore);
    storeTokenSelector = store.overrideSelector(
      AuthSelectors.authTokenSelector,
      "token"
    );
  });
  describe("trySignup effect", () => {
    it("should return empty action SignupSuccess", () => {
      fakeAuth.signup.and.returnValue(of(user));
      actions = hot("---a-", { a: new AuthActions.TrySignup(user) });
      const expected = cold("---a-", {
        a: new AuthActions.SignupSuccess({ message: "Inscription réussie" }),
      });
      expect(effects.trySignup$).toBeObservable(expected);
    });
    it("should return error", () => {
      fakeAuth.signup.and.returnValue(cold("-#", {}, { error: "error" }));
      actions = hot("---a-", { a: new AuthActions.TrySignup(user) });
      const expected = cold("----a", {
        a: new AuthActions.SignupError("error"),
      });
      expect(effects.trySignup$).toBeObservable(expected);
    });
  });
  //SIGNUP SUCCESS
  describe("signupSuccess$ effect", () => {
    it("should nagivate to /signin", () => {
      spyOn(routerService, "navigate").and.callThrough();
      actions = hot("-a-", {
        a: new AuthActions.SignupSuccess({ message: "ok" }),
      });
      const expected = cold("-b", {
        b: new AuthActions.SignupSuccess({ message: "ok" }),
      });
      expect(effects.signupSuccess$).toBeObservable(expected);
      effects.signupSuccess$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(["/signin"]);
      });
    });
  });

  //TRY SIGNIN
  describe("trySignin effect", () => {
    it("should return token", () => {
      fakeAuth.signin.and.returnValue(of("token"));
      actions = hot("---a-", {
        a: new AuthActions.TrySignin(credentials),
      });
      const expected = cold("---a-", {
        a: new AuthActions.SigninSuccess("token"),
      });
      expect(effects.trySignin$).toBeObservable(expected);
    });
    it("should return error", () => {
      //On simule le retour authService.signin qui retourne un observable
      //qui va générer une erreur(catchError)
      fakeAuth.signin.and.returnValue(cold("-#", {}, { error: "error" }));
      //On simule un flux d'un observable
      actions = hot("---a-", {
        a: new AuthActions.TrySignin({
          email: "test@test.fr",
          password: "password",
        }),
      });
      //On définit un observable qui va simuler contenir une valeur b au bout de 5 entités
      const expected = cold("----b", {
        b: new AuthActions.SigninError("error"),
      });
      expect(effects.trySignin$).toBeObservable(expected);
    });
  });

  //SIGNIN SUCCESS
  describe("signinSuccess$ effect", () => {
    it("should nagivate to /", () => {
      fakeAuth.initTimer.and.returnValue(of(1));
      //On crée un espion (instance du service router , methode qui est appellée)
      spyOn(routerService, "navigate").and.callThrough();
      //On vérifie qu'il dispatch bien l'action
      actions = hot("-a-", { a: new AuthActions.SigninSuccess("token") });
      const expected = cold("-b", {
        b: new AuthActions.SigninSuccess("token"),
      });
      expect(effects.signinSuccess$).toBeObservable(expected);
      //On espoinne le router grâce à notre espion en utilisant la méthode toHaveBeenCalledWith
      effects.signinSuccess$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith([""]);
      });
    });
  });

  //TRY REFRESH TOKEN
  describe("Try refresh Token", () => {
    it("should return token", () => {
      fakeAuth.refreshToken.and.returnValue(of("newToken"));
      actions = hot("---a", {
        a: new AuthActions.TryRefreshToken(),
      });
      const expected = cold("---a", {
        a: new AuthActions.SigninSuccess("newToken"),
      });
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });
    it("should return empty from catchError", () => {
      fakeAuth.refreshToken.and.returnValue(cold("-#", {}, "error"));
      actions = hot("---a", {
        a: new AuthActions.TryRefreshToken(),
      });
      const expected = cold("");
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });
    it("should return empty because no token in state", () => {
      storeTokenSelector = store.overrideSelector(
        AuthSelectors.authTokenSelector,
        null
      );
      actions = hot("---a", {
        a: new AuthActions.TryRefreshToken(),
      });
      const expected = cold("");
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });
  });

  //LOGOUT
  describe("logout", () => {
    it("should navigate to /", () => {
      spyOn(routerService, "navigate").and.callThrough();
      actions = hot("-a-", { a: new AuthActions.Logout() });
      const expected = cold("-b", { b: new AuthActions.Logout() });
      expect(effects.logout$).toBeObservable(expected);
      effects.logout$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith([""]);
      });
    });
  });

  //TRY FETCH CURRENT USER
  describe("try fetch current user", () => {
    it("should return SetCurrentUser action with user", () => {
      fakeUser.getCurrentUser.and.returnValue(of(userData));
      actions = hot("---a-", { a: new AuthActions.TryFetchCurrentUser() });
      const expected = cold("---a", {
        a: new AuthActions.SetCurrentUser(userData),
      });
      expect(effects.fetchCurrentUser$).toBeObservable(expected);
    });
  });
});
