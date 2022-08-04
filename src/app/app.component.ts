import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "./app.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {environment as env} from "../environments/environment";
import {IMqttServiceOptions, MqttConnectionState, MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {IRIS} from "../../iris";
import {v4 as uuidv4} from 'uuid'
import {group} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'animOne';
  @ViewChild('userPassword') userPasswordInput: ElementRef | any;
  @ViewChild('userPasswordConfirm') userPasswordConfirmInput: ElementRef | any;

  public screenWidth: any;
  public height: any;

  public passwordTextArea: boolean = false;
  public passwordConfirmTextArea: boolean = false;

  public formPromo: FormGroup;
  public segments: number = 0;
  public guid: string = ''
  public regErrorText: any = [];
  public regSuccess: boolean = false;

  public loading: boolean = false;
  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;

  public mqttSubscription: Subscription | undefined;
  public regSubscription: Subscription | undefined;

  constructor(public appService: AppService,
              private mqttService: MqttService,
              private formBuilder: FormBuilder,
              public translateService: TranslateService) {
    this.screenWidth = window.innerWidth;
    this.height = this.appService.getElementHeight('right_panel-dark-img')

    this.formPromo = formBuilder.group({
      "userFio": ["", [Validators.required, this.checkSpaces, this.checkCyrillic]],
      "userLogin": ["", [Validators.required, this.checkEnglish, Validators.minLength(6)]],
      "userEmail": ["", [Validators.required, Validators.email]],
      "userPhone": ["", [Validators.required, Validators.minLength(6), Validators.pattern('^[-+()0-9]+$')]],
      "userPassword": ["", [Validators.required,
        Validators.minLength(6), Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9]+$'), this.checkPasswordUppercase, this.checkEnglish, this.checkNumbers]],
      "userPasswordConfirm": ["", [Validators.required]],
      "userCaptcha": ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    }, {validators: this.checkPasswords});
  }

  openUserAgreement() {
    const lang = this.translateService.currentLang
    if (lang === 'ru') {
      window.open('assets/pdf/user-agreement-ru.pdf', '_blank');
    } else if (lang === 'kz') {
      window.open('assets/pdf/user-agreement-kz.pdf', '_blank');
    } else if (lang === 'en') {
      window.open('assets/pdf/user-agreement-eng.pdf', '_blank');
    }
  }

  getHeight(value: string) {
    if (this.screenWidth <= 1100) {
      return 'auto'
    }
    // @ts-ignore
    return document.getElementById(value).getBoundingClientRect().height + 'px';
  }

  public checkPasswords: ValidatorFn = (control: any): ValidationErrors | null => {
    if (control.controls['userPassword'].value === control.controls['userPasswordConfirm'].value) {
      return null;
    }
    return {'mismatch': true};
  }

  clickTextAreaValue(name: string) {
    if (name === 'password') {
      this.passwordTextArea = true
    } else if (name === 'passwordConfirm') {
      this.passwordConfirmTextArea = true
    }
    setTimeout(() => {
      // @ts-ignore
      document.getElementById(name).focus();
    })
  }

  changeTextAreaValue(name: string, value: string) {
    if (name === 'password' && value.length === 0) {
      this.passwordTextArea = false
    } else if (name === 'passwordConfirm' && value.length <= 0) {
      this.passwordConfirmTextArea = false
    }
  }

  getPlaceholder(value: string) {
    return this.translateService.instant(value)
  }

  textAreaValue(value: string, elementRef: string): boolean {
    let t = 0;
    if (value.length > 0) {
      if (t === 0) {
        setTimeout(() => {
          console.log(123)
          // @ts-ignore
          document.getElementById(elementRef).focus();
        })
      }
      return true
    }
    return false;
  }

  checkFio: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let fio = group?.value;
    if (!fio) {
      return null;
    }
    let f_i_o = fio.trim().replace(/\s+/g, ' ').split(' ');
    if (f_i_o[0] && f_i_o[1] && f_i_o[2] && !f_i_o[3]) {
      return null;
    } else {
      return {'notSame': true};
    }
  }

  checkSpaces: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let regex = ' ';
    if (group.value.search(regex) != -1) {
      return {'spaces': true};
    }
    return null;
  }

  checkPasswordUppercase: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let regex = '[A-Z]';
    if (group.value.search(regex) != -1) {
      return null;
    }
    return {'uppercase': true};
  }

  checkEnglish: ValidatorFn = (group: AbstractControl): ValidationErrors | null => { // тут походу костыль
    let regex2 = '^[a-zA-Z0-9]+$';
    let pass = group.value;
    let j = 0;
    for (let i = 0; i < pass.length; i++) {
      if (0 < Number.parseInt(pass[i]) && Number.parseInt(pass[i]) < 9) {
        j++;
      }
    }
    if (j === pass.length) {
      return {'english': true};
    }
    if (pass.match(regex2)) {
      return null;
    } else {
      return {'english': true};
    }
  }

  checkCyrillic: ValidatorFn = (group: AbstractControl): ValidationErrors | null => { // тут походу костыль
    let regex2 = '^[а-яА-Я]+$';
    let pass = group.value;
    let j = 0;
    for (let i = 0; i < pass.length; i++) {
      if (0 < Number.parseInt(pass[i]) && Number.parseInt(pass[i]) < 9) {
        j++;
      }
    }
    if (j === pass.length) {
      return {'cyrillic': true};
    }
    if (pass.match(regex2)) {
      return null;
    } else {
      return {'cyrillic': true};
    }
  }

  checkNumbers: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let regex = '[0-9]';
    if (group.value.search(regex) != -1) {
      return null;
    }
    return {'number': true};
  }

  ngOnInit() {
    this.guid = this.generateUuid();
  }

  getU() {
    console.log(this.formPromo);
    // console.log(this.userPassword.errors?.['minlength']);
  }

  get userFio() {
    return this.formPromo.controls['userFio'];
  }

  get userLogin() {
    return this.formPromo.controls['userLogin'];
  }

  get userEmail() {
    return this.formPromo.controls['userEmail'];
  }

  get userPhone() {
    return this.formPromo.controls['userPhone'];
  }

  get userPassword() {
    return this.formPromo.controls['userPassword'];
  }

  get userPasswordConfirm() {
    return this.formPromo.controls['userPasswordConfirm'];
  }

  get userCaptcha() {
    return this.formPromo.controls['userCaptcha'];
  }

  generateUuid() {
    return uuidv4();
  }

  getSegments() {
    let segments = 0;
    if (!this.userPassword.errors?.['uppercase']) {
      segments++;
    }
    if (!this.userPassword.errors?.['english']) {
      segments++;
    }
    if (!this.userPassword.errors?.['number']) {
      segments++;
    }
    if (!this.userPassword.errors?.['minlength']) {
      segments++;
    }
    return segments;
  }

  promoFormSubmit() {
    if (this.formPromo.valid) {
      this.regErrorText = [];
      console.log('promo is valid');
      const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
        hostname: env.mqtt.server,
        port: env.mqtt.port,
        protocol: (env.mqtt.protocol === 'wss') ? 'wss' : 'ws',
        path: env.mqtt.directory,
        username: 'iris@open.kase.kz',
        password: 'free',
      }
      this.mqttService.disconnect();
      this.mqttService.connect(MQTT_SERVICE_OPTIONS);
      this.mqttSubscription = this.mqttService.state.subscribe((state: MqttConnectionState) => {
        // console.log(state)

        if (state === 0) {
          // this.mqttSubscription?.unsubscribe();
        }
        if (state === 1) {

        }
        if (state === 2) {
          this.regSubscription?.unsubscribe();
          console.log("start send");
          this.loading = true;

          let fio = this.userFio.value.trim().replace(/\s+/g, ' ').split(' ');
          this.appService.sendUserRegRequest(
            this.userEmail.value,
            this.userLogin.value,
            '',
            this.userFio.value,
            '',
            this.userPhone.value,
            this.userPassword.value,
            this.userCaptcha.value,
            this.guid
          );
          this.regSubscription = this.appService.getInfoRegRequest()
            .subscribe((regReply: IRIS.OpenInfoApiReply) => {
              if (regReply.userRegReply?.ok) {
                this.regErrorText = [];
                console.log('ok');
                this.regSuccess = true;
                this.loading = false;
              } else if (!regReply.userRegReply?.ok) {
                this.regErrorText = [];
                console.log('not ok');
                this.loading = false;
                this.guid = this.generateUuid();
                console.log(regReply.userRegReply);
                if (regReply.userRegReply?.messages) {
                  regReply.userRegReply?.messages.forEach(item => {
                    this.regErrorText.push(item.id + ': ' + item.message);
                  })
                }
              } else {
                console.log(regReply);
                this.loading = false;
              }

            })
        }
      })
    } else {
      this.formPromo.markAllAsTouched()
    }
  }

  public getCaptchaLink() {
    return env.mqtt.server.toString() === '192.168.211.181'
      ? 'http://192.168.211.181:8080/iris-api-ee/rest/captcha/' : 'https://irisapi.kase.kz/iris-api-ee/rest/captcha/'
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.height = this.appService.getElementHeight('right_panel-dark-img')
  }

  ngOnDestroy(): void {
    this.regSubscription?.unsubscribe();
    this.mqttSubscription?.unsubscribe();
  }
}
