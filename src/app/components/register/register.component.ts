import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserI } from 'src/app/models/user';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  public checked = true;

  public checked2 = true;

  userData: UserI = {
    uid: null,
    email: null,
    password: null,
    role: 'user'
  };

  userRegister: FormGroup;

  loading: boolean = false;

  res: any;

  passwordPatern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))(?=(?!.*(.)\1)).{8,}/;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private authSvc: AuthService,
    private frservice: FirestoreService

    ) { 

      this.userRegister = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPatern)]],
        confirmPassword: ['', Validators.required],
        privacy: ['', [Validators.required, Validators.requiredTrue]],
        consent: ['', [Validators.required, Validators.requiredTrue]]
      })

    }

  ngOnInit() {}

  openPrivacy() {
    this.checked = false;
  }

  openConsent() {
    this.checked2 = false;
  }
  
  async register() {
    const email = this.userRegister.value.email;
    const password = this.userRegister.value.password;
    const confirmPassword = this.userRegister.value.confirmPassword;

    this.userRegister.reset();



    if((password.length  || confirmPassword.length) < 8) {
      this.toastr.error('La contraseña debe de contener 8 caracteres como minimo', 'Error');
      return;
    }

    if (this.passwordPatern.test(password)) {
      
    } else {
      this.toastr.error('La contraseña debe contener 1 letra minúscula, 1 letra mayúscula, 1 número, 1 carácter especial y tener al menos 8 caracteres', 'Error');
      return;
    }

    if(password !== confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.loading = true;

    this.authSvc.register(email, password).then(async (result:any) => {
      this.res = result?.user;
      await this.registerDB();
      await this.verifyEmail();
      
    
    })
    .catch((error) => {
        this.toastr.error(error, 'Error');
        this.loading = false;
    });

     
  }

  verifyEmail() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())
    .then(() => {
      this.authSvc.logout();
      this.toastr.info('Se envio un correo con el link de verificación', 'Verificar Email')
      this.router.navigate(['/Verify-Email'])
      
    });
  }

  async registerDB() {
    const path = 'Users';
    const id = this.res.uid;
    this.userData.uid = id;
    this.userData.password = null;
    await this.frservice.createDoc(this.userData, path, id);
  }

}