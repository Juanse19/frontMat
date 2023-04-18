/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from "@nebular/auth";
import { getDeepFromObject } from "../../helpers";
import { NbThemeService } from "@nebular/theme";
import { EMAIL_PATTERN } from "../constants";
import { InitUserService } from "../../../@theme/services/init-user.service";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../@core/backend/common/api/apiGet.services";
import { delay, retry, retryWhen, switchMap, take, takeWhile, timeout } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { Subscription, interval } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { WebSocketService } from "../../../@core/backend/common/services/web-socket.service";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from "../../../../environments/environment";
export const WS_ENDPOINT = environment.urlWebSocket;


interface dataLicens {
  Id: number;
  Lat: number;
  States: number;
  Licens_id: string;
}


@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {
  // correo = 'admin@admin.admin';
  // contrasena = 'admin';

  public numTentativas = 0;
  public isLoading?: boolean = false;

  intervalSubscriptionSesion: Subscription;

  minLength: number = this.getConfigValue(
    "forms.validation.password.minLength"
  );
  maxLength: number = this.getConfigValue(
    "forms.validation.password.maxLength"
  );
  redirectDelay: number = this.getConfigValue("forms.login.redirectDelay");
  showMessages: any = this.getConfigValue("forms.login.showMessages");
  strategy: string = this.getConfigValue("forms.login.strategy");
  socialLinks: NbAuthSocialLink[] = this.getConfigValue(
    "forms.login.socialLinks"
  );
  rememberMe = this.getConfigValue("forms.login.rememberMe");
  isEmailRequired: boolean = this.getConfigValue(
    "forms.validation.email.required"
  );
  isPasswordRequired: boolean = this.getConfigValue(
    "forms.validation.password.required"
  );

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;
  currentUserId: number;

  public validData: dataLicens[] = [];
  public timer: number;

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  timer$: Subscription;
  private timeoutId?: any;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    protected initUserService: InitUserService,
    private userStore: UserStore,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private toasterService: NbToastrService,
    private http: HttpClient,
    private socketService: WebSocketService,
  ) {
    this.socketService.connect();
    // this.wSocket();
  }

  ngOnInit(): void {
    const emailValidators = [Validators.pattern(EMAIL_PATTERN)];
    this.isEmailRequired && emailValidators.push(Validators.required);
    // this.websocker();

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control("", [...emailValidators]),
      password: this.fb.control("", [...passwordValidators]),
      rememberMe: this.fb.control(false),
    });
  }

  login(): void {
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    // incrementa
    this.numTentativas++;
    // console.log('numTentativas', this.numTentativas);

    if (this.user.email === "" && this.user.password === "") {

      let alert: any;
      alert = Swal.fire({
        title: `Se requiere confirmar Correo electrónico y Contraseña`,
        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
      });

      return alert;
    }


    // if (this.numTentativas >= 5) {
    //   // bloqueado o usuario
    //   Swal.fire({
    //     title: `Usuario bloquado, excediste el número de intentos contacta al administrador`,
    //     icon: "warning",
    //     timer: 3000,
    //     showConfirmButton: false,
    //     // onOpen: function () {
    //     //   Swal.showLoading()
    //     //   this.isLoading = true;
    //     // }
    //   });
    //   // exibe mensagem de erro
    //   return;
    // }

    this.socketService.getSocket()
      .pipe(
        retry(3),
        retryWhen(errors => errors.pipe(delay(5000), take(10))),

      )
      .subscribe(
        (msg) => {

          console.log(msg);

          // Swal.fire({
          //   title: `${msg.message}`,
          //   icon: "warning",
          //   timer: 2000,
          //   showConfirmButton: false,
          // });

          if (msg.isActive === true && msg.message === 'Sesión iniciada en otro dispositivo') {
            // console.log(msg.message);
            this.startTimeout();
            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              // timer: 5000,
              showConfirmButton: false,
              onOpen: () => {
                Swal.showLoading()
                this.isLoading = true;
              }
            });
            // setTimeout(() => {

            //   if (this.isLoading = true) {
            //     console.log("Sesión finalizada login");
            //   // this.socketService.sendMessage({ route: "changeSession", changeSession: true, email: this.loginForm.value.email });
            //   localStorage.clear();
            //   // this.isLoading = false;
            //   this.socketService.sendMessage({ route: "logoutUser", email: this.loginForm.value.email });
            //   }

            // }, 4000);

          }

          // if (msg.message === 'Iniciar sesion nuevamente') {
          //   // console.log(msg.message);

          //   Swal.fire({
          //     title: `${msg.message}`,
          //     icon: "success",
          //     timer: 2000,
          //     showConfirmButton: false,
          //   });

          //   this.socketService.sendMessage({ route: "updateSession", email: this.loginForm.value.email });
          // }

          if (msg.changeSession === false && msg.message === 'No fue posible cerrar la sesión activa, intente mas tarde') {
            console.log(msg.message);

            this.stopTimeout();
            this.changeMethod();

            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              timer: 3000,
              showConfirmButton: false,
              onOpen: () => {
                this.isLoading = false;

                // Swal.close();
              }
            });
            this.socketService.close();
          }

          if (msg.changeSession === true && msg.message === 'Iniciar sesión nuevamente') {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });

            this.socketService.sendMessage({ route: "updateSession", email: this.loginForm.value.email });
            this.socketService.close();
          }

          if (msg.isActive === false) {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              timer: 2000,
              showConfirmButton: false,
            });

          }

          // if (msg.isActive === true && msg.message === 'intentando cambiar sesion') {
          //   console.log(msg.message);

          //   Swal.fire({
          //     title: `${msg.message}, Sesión encontrada`,
          //     text: "Desea cerrar la sesión",
          //     // timer: 10000,
          //     icon: "success",
          //     showCancelButton: true,
          //     confirmButtonColor: "#d33",
          //     cancelButtonColor: "#3085d6",
          //     confirmButtonText: "NO",
          //     cancelButtonText: "SI",
          //   }).then((result) => {

          //     if (result.value) {
          //       console.log('Si!');
          //       this.socketService.sendMessage({ route: "changeSession", changeSession: false, email: this.loginForm.value.email });
          //     } else {
          //       console.log('Se cierra por tiempo');


          //       this.socketService.sendMessage({ route: "changeSession", changeSession: true, email: this.loginForm.value.email });
          //       this.router.navigate(['/auth/logout']);
          //       localStorage.clear();
          //       // this.socketService.sendMessage({ email: this.loginForm.value.email });
          //       this.socketService.sendMessage({ route:"logoutUser", email: this.loginForm.value.email})

          //     }
          //   });

          // }

          // if (msg.statusCode === 404 && msg.Message) {
          //   this.toasterService.danger(msg.Error, "Usuario Invalido", {
          //     duration: 30000,
          //   });
          // }

          // if (msg.statusCode === 404 && msg.Error) {
          //   this.toasterService.danger(msg.Error, "Contraseña Invalida", {
          //     duration: 30000,
          //   });
          // }

        },
        (err) => {
          console.error(err)
          Swal.fire({
            title: `WebSocket Desconectado o en error, ${err.type}`,
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
          });
        },)

    this.socketService.sendMessage({ route: "login" });
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;



      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.initUserService.initCurrentUser().subscribe();
      } else {
        this.errors = result.getErrors();
        console.log('this.errors', this.errors);

      }

      let currentUseremail = this.userStore.getUser()?.email;

      const redirect = result.getRedirect();

      if (redirect == '/') {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);

        }, this.redirectDelay);

      }

      this.cd.detectChanges();
    });
  }

  startTimeout() {
    this.timeoutId = setTimeout(() => {
      localStorage.clear();
      this.socketService.sendMessage({ route: "logoutUser", email: this.loginForm.value.email });
      console.log('Este mensaje se muestra después de 5 segundos');
    }, 4000);
  }

  stopTimeout() {
    clearTimeout(this.timeoutId);
  }

  changeMethod() {
    // Cancela el setTimeout si se cambia de método
    this.stopTimeout();

    // Lógica del nuevo método
    console.log('Se cambió de método');
  }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }


  ngOnDestroy(): void {
    this.alive = false;
    this.socketService.close();
    // this.myWebSocket.complete();
  }

}
