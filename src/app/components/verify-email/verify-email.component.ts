import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent  implements OnInit {

  constructor(private menu: MenuController) {
    this.menu.enable(false);
   }

  ngOnInit() {}

}
