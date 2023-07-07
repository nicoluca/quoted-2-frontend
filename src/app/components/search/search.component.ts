import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  constructor(private router: Router) { }

  search(keyword: string) {
    console.log(`search_value=${keyword}`);
    this.router.navigate(['/quotes/byKeyword', keyword]);
  }

}
