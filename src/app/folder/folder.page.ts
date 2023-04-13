import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@capacitor/clipboard';


declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; disableDefaultUI: boolean; }) => any; InfoWindow: new () => any; ControlPosition: { TOP_CENTER: string | number; }; event: { addListenerOnce: (arg0: any, arg1: string, arg2: () => void) => void; }; }; }

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public map: any = google.maps.Map;

  public folder!: string;

  public text = "";

  public hsDecks = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private menu: MenuController,
    private toastr: ToastrService
    ) 
    {
    this.menu.enable(true);
   }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async copyDeck(text: string) {
    await Clipboard.write({string: text});
    this.toastr.show('Deck Copied!')
}

// Load Map functions

  async loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: any = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 21.883182, lng: -102.295248};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    });

    const infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Get Current Location";
    locationButton.classList.add("btn");
    locationButton.classList.add("btn-dark");
    locationButton.classList.add("btn-lg");
    locationButton.classList.add("mt-3");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);
            infoWindow.setContent('<div class="fs-4 fw-bold black btn-dark p-2 rounded"> You Are Here <i class="fa-solid fa-location-dot"></i> </div>');
            infoWindow.open(this.map);
            this.map.setCenter(pos);  
          }
        );
      }
      
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      /*this.renderMarkers();*/
      mapEle.classList.add('');
    });
  }
}

