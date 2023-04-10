import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserI } from 'src/app/models/user';
import { FirestoreService } from 'src/app/service/firestore.service';
import { MenuController } from '@ionic/angular';

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
    private frservice: FirestoreService,
    private menu: MenuController

    ) { 

      this.userRegister = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPatern)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(this.passwordPatern)]],
        privacy: ['', [Validators.required, Validators.requiredTrue]],
        consent: ['', [Validators.required, Validators.requiredTrue]]
      })

      this.menu.enable(false);

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

    if(password !== confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      console.log('Las contraseñas no coinciden')
      return;
    }

    this.loading = true;

    this.authSvc.register(email, password).then(async (result:any) => {
      this.res = result?.user;
      this.userRegister.reset();
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