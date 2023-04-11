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
import { delay, retry, retryWhen, take, takeWhile } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
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

  myWebSocket: WebSocketSubject<any> = webSocket(WS_ENDPOINT);

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

  login1(): void {
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.myWebSocket.next(this.loginForm.value)

    let currentUserId = this.userStore.getUser()?.id;

    if (currentUserId === undefined) {
      currentUserId = 1;
    } else {
      currentUserId;
    }

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      this.http.get(this.api.apiUrlNode + "/api/getlEmailuser?Email=" + this.user.email)
        .subscribe((res: any) => {

          this.validData = res;

          if ((this.validData[0].Lat === 0 &&
            this.validData[0].Licens_id === "1" &&
            this.validData[0].States === 1) ||
            this.validData[0].Lat === null) {

            if (result.isSuccess()) {
              this.messages = result.getMessages();
              this.initUserService.initCurrentUser().subscribe();
            } else {
              this.errors = result.getErrors();
            }

            // console.log('Inicia sesion');
            const redirect = result.getRedirect();

            if (redirect == '/') {
              setTimeout(() => {
                return this.router.navigateByUrl(redirect);
              }, this.redirectDelay);

              var respon = {
                user: this.validData[0].Id,
                sesion: 1,
              };

              this.http
                .post(this.api.apiUrlNode + "/updateSesion", respon)
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                  //  console.log("Envió: ", res);
                });
              var respons = {
                user: this.user.email,
                message: "Inicio sesión",
                users: currentUserId,
              };
              this.http
                .post(this.api.apiUrlNode + "/postSaveAlarmUser", respons)
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                });
            }
            this.cd.detectChanges();

          } else if (this.validData[0].Licens_id === "2") {
            // debugger
            console.log("licencia de usuario inactiva");
            this.toasterService.danger(
              "",
              `¡Licencia Inactiva, por favor comuniquese con el administrador!`
            );
          } else if (this.validData[0].Licens_id === null) {

            // console.log("No tiene tiene licencia ");
            this.toasterService.danger("", `¡No tiene tiene licencia!`);

          } else if (

            this.validData[0].States === 2 ||
            this.validData[0].States === null

          ) {

            // console.log("Usuario Inactivo");
            this.toasterService.danger("", `¡Usuario Inactivo!`);

          } else {
            // debugger
            const redirect = result.getRedirect();
            if (redirect == undefined) {
              debugger

              this.errors = result.getErrors();
              this.messages = result.getMessages();
              this.initUserService.initCurrentUser().subscribe();
            } else {
              // debugger
              this.myWebSocket
                .pipe(// concatMap((item) => of (item).pipe(delay(1000))) 
                  retryWhen(errors => errors.pipe(delay(1000), take(10))),
                )
                .subscribe(
                  (msg) => {


                    console.log(msg);

                    if (msg.isActive === true) {
                      console.log(msg.message);

                    }

                  },
                  (err) => {
                    // this.toastrService.danger(err.type, "Error de conexión del WebSocket", {
                    //   duration: 30000,
                    // });
                  },

                );
              Swal.fire({
                title: "Sesión encontrada",
                text: `Actualmente tienes una sesión iniciada en nuestra plataforma, debes finalizar para continuar.
          ¿Desea cerrar la sesión activa?`,
                // timer: 10000,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "SI",
                cancelButtonText: "No",
              }).then((result) => {

                if (result.value) {
                  let timers = 4500;

                  var respon = {
                    user: this.validData[0].Id,
                    sesion: 0,
                  };

                  this.http
                    .post(this.api.apiUrlNode + "/updateSesion", respon)
                    .pipe(takeWhile(() => this.alive))
                    .subscribe((res: any) => {
                      // console.log("Se actualizó: ", res);
                    });

                  Swal.fire({
                    title: "¡Cargando!",
                    text: "Esperando que se cierre la sesión",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timer: timers,
                    onOpen: () => {
                      Swal.showLoading();
                    },
                  }).then((result) => {
                    if (result.value === this.timer) {
                      // debugger;

                      // console.log("closed by timer!!!!");
                      this.http
                        .post(
                          this.api.apiUrlNode +
                          "/api/getlEmailuser?Email=" +
                          this.user.email, {}
                        )
                        .pipe(takeWhile(() => this.alive))
                        .subscribe((res: any) => {
                          this.validData = res;

                          if (this.validData[0].Lat == 1) {
                            Swal.fire({
                              title: "El usuario continua con la sesión, Vuelva ha intentar!",
                              icon: "warning",
                              timer: 2000,
                              showConfirmButton: false,
                            });
                          } else {
                            Swal.fire({
                              title: "Se finalizó la sesión, Ya puede ¡iniciar sesión!",
                              icon: "success",
                              timer: 2000,
                              showConfirmButton: false,
                            });
                          }
                        });
                    }
                  });
                }

              });
            }
          }
        });
    });

  }

  login(): void {
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    

    this.socketService.getSocket()
    .pipe(
      retry(3),
      retryWhen(errors => errors.pipe(delay(5000), take(10))),
      
    )
      .subscribe(
        (msg) => {

          // console.log(msg);

          // Swal.fire({
          //   title: `${msg.message}`,
          //   icon: "warning",
          //   timer: 2000,
          //   showConfirmButton: false,
          // });

          if (msg.isActive === true && msg.message === 'sesion iniciada en otro dispositivo') {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              timer: 2000,
              showConfirmButton: false,
            });

          }

          if (msg.message === 'iniciar sesion nuevamente') {
            // console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });

            this.socketService.sendMessage({ route: "updateSession", email: this.loginForm.value.email });
          }

          if (msg.isActive === true && msg.message === 'iniciar sesion nuevamente') {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              timer: 2000,
              showConfirmButton: false,
            });

            this.socketService.sendMessage({ route: "updateSession", email: this.loginForm.value.email });
            this.socketService.close();
          }

          if (msg.isActive === false ) {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}`,
              icon: "warning",
              timer: 2000,
              showConfirmButton: false,
            });

          }

          if (msg.isActive === true && msg.message === 'intentando cambiar sesion') {
            console.log(msg.message);

            Swal.fire({
              title: `${msg.message}, Sesión encontrada`,
              text: "Desea cerrar la sesión",
              // timer: 10000,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "NO",
              cancelButtonText: "SI",
            }).then((result) => {

              if (result.value) {
                console.log('Si!');
                this.socketService.sendMessage({ route: "changeSession", changeSession: false, email: this.loginForm.value.email });
              } else {
                console.log('Se cierra por tiempo');


                this.socketService.sendMessage({ route: "changeSession", changeSession: true, email: this.loginForm.value.email });
                this.router.navigate(['/auth/logout']);
                localStorage.clear();
                // this.socketService.sendMessage({ email: this.loginForm.value.email });
                this.socketService.sendMessage({ route:"logoutUser", email: this.loginForm.value.email})

              }
            });

          }

          if (msg.statusCode === 404 && msg.Message) {
            this.toasterService.danger(msg.Error, "Usuario Invalido", {
              duration: 30000,
            });
          }

          if (msg.statusCode === 404 && msg.Error) {
            this.toasterService.danger(msg.Error, "Contraseña Invalida", {
              duration: 30000,
            });
          }

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

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  

}
