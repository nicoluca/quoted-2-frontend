import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent {

  placeholderText: string = 'Add quote...';

  constructor(private quoteService: QuoteService,
    private router: Router) { }

  addQuote(text: string, event: Event) {
    event.preventDefault();
    console.log(`Adding quote: "${text}"`);
    
    this.quoteService.addQuote(text).subscribe(
      data => {
        console.log(`Added quote: "${data.text}" with id: ${data.id}`);
        // this.router.navigate(['/quotes']);

        // Update the quote list
        console.log('Refreshing quotes...');
        this.quoteService.refreshQuotes();
      }
    );
    
    // Set the input field back to placeholder text
    const inputField = document.getElementById('add-quote-input') as HTMLInputElement;
    inputField.value = this.placeholderText;
  }

}
