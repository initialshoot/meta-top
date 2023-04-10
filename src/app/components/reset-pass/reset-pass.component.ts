import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent  implements OnInit {
  
  recoverUser: FormGroup;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) 
  {
    this.recoverUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recover() {
    const email = this.recoverUser.value.email;

    this.loading = true;

    this.afAuth
    .sendPasswordResetEmail(email)
    .then(() => {

      this.toastr.info('The reset link has been sended', 'Reset Password');

      this.router.navigate(['/login']);
      
    })
    .catch((error) => {

      this.loading = false;

      this.toastr.error(error.code, 'Error');

    });
  }

}