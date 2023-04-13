import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/service/firestore.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-hs-heroes',
  templateUrl: './hs-heroes.component.html',
  styleUrls: ['./hs-heroes.component.scss'],
})
export class HsHeroesComponent  implements OnInit {

  public hero!: string;

  public path!: string;

  public decks!: any;

  constructor(    
    private activatedRoute: ActivatedRoute,
    private firestore: FirestoreService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.hero = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.firestore.getCollection<any>(this.hero).subscribe( res => {
        try {
          this.decks = res;
        } catch(error) {
          console.log(error);
        }
      })
  }


  async copyDeck(text: string) {
      await Clipboard.write({string: text});
      this.toastr.show('Deck Copied!')
  }

}
