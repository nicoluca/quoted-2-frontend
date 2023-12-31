import { Component } from '@angular/core';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  constructor(private downloadService: DownloadService) { }


  exportQuotes() {
    console.log('Exporting quotes...');

    this.downloadService.downloadZip().subscribe(
      (data: any) => {
        console.log('Received data: ', data);
        const blob = new Blob([data], {type: 'application/zip'});

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "quotes.zip";
        link.click();
      }
    );
  }

}
