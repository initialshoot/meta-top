import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
