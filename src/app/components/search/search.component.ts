import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  constructor(private router: Router,
              private searchService: SearchService) { }

  search(keyword: string) {
    if (keyword.length === 0) {
      this.searchService.setSearchTerm('');
      this.router.navigate(['/quotes']);
    } else {
      console.log(`search_value=${keyword}`);
      this.searchService.setSearchTerm(keyword);
      this.router.navigate(['/quotes/byKeyword', keyword]);
    }
  }

}
