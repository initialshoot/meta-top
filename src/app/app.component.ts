import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'fa-solid fa-house' },
    { title: 'Hearthstone', url: '/folder/Hearthstone', icon: 'fa-solid fa-hat-wizard' },
    { title: 'MarvelSnap', url: '/folder/MarvelSnap', icon: 'fa-solid fa-cube' },
    { title: 'Location', url: '/folder/Location', icon: 'fa-solid fa-location-crosshairs' },
  ];

  public logAction = [
    { title: 'Logout', icon: 'fa-solid fa-right-from-bracket' },
  ]
  constructor() {}
}
