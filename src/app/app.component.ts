import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from './models/user';
import { AuthService } from './service/auth.service';
import { FirestoreService } from './service/firestore.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public route!: string;

  public path!: string;

  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'fa-solid fa-house' },
    { title: 'Hearthstone', url: '/folder/Hearthstone', icon: 'fa-solid fa-hat-wizard' },
    { title: 'MarvelSnap', url: '/folder/MarvelSnap', icon: 'fa-solid fa-cube' },
    { title: 'Location', url: '/folder/Location', icon: 'fa-solid fa-location-crosshairs' },
  ];

  public logAction = [
    { title: 'Logout', icon: 'fa-solid fa-right-from-bracket' },
  ]

  logged: boolean = false;

  userInfo: UserI = {
    uid: null,
    email: null,
    password: null,
    role: null
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService,
    private firestore: FirestoreService,
    private menu: MenuController
    ) {

      this.authSvc.getCurrentUser().subscribe( res => {
        if (res) {
          if (res.emailVerified == true) {
            this.logged = true;
            this.getDatosUser(res.uid)
          } else {
            this.logged = false;
          }
        } else {
          this.logged = false;
        }
      })

    }

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async logout() {
    try {
      this.router.navigate(['/Start'])
      await this.authSvc.logout()
      this.menu.enable(false);
    } catch(error) {
      console.log(error);
    }
    
  }

  // Firebase User

  getDatosUser(uid: string) {
    const path = 'Users';
    const id = uid;
    this.firestore.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.userInfo = res
      }
    })
  }
}
