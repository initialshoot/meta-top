import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  loginUser: FormGroup;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private menu: MenuController
  ) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.menu.enable(false);
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.emailVerified) {
        this.menu.enable(true);
        this.router.navigate(['/folder/Home'])
      } else {
        this.router.navigate(['/Verify-Email'])
      }
      
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(error, 'Error')
    })
  }

}