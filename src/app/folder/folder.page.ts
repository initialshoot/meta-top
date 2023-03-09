import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  public text = "";

  public hsDecks = []

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async copyDeck(text: string) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {}
    }
  }

}

