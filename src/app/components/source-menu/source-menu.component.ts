import { Component } from '@angular/core';
import { Source } from 'src/app/domain/source';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-source-menu',
  templateUrl: './source-menu.component.html',
  styleUrls: ['./source-menu.component.css']
})
export class SourceMenuComponent {

  sources: Source[] = [];

   // pagination properties
   pageNumber: number = 1;
   pageSize: number = 10;
   totalElements: number = 0;

  constructor(private sourceService: SourceService) { }

  ngOnInit(): void {
    this.sourceService.getPageableSources(this.pageNumber - 1, this.pageSize).subscribe(
      this.processResult()
    );
  }

  processResult() {
    return (data: any) => {
      this.sources = data._embedded.sources;
      this.pageNumber = data.page.number + 1; // Spring Data REST pages are 0-based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
