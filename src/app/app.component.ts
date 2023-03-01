import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'mail' },
    { title: 'Hearthstone', url: '/folder/Hearthstone', icon: 'paper-plane' },
    { title: 'MarvelSnap', url: '/folder/MarvelSnap', icon: 'heart' },
  ];
  constructor() {}
}
