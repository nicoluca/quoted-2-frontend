import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.css']
})
export class ImprintComponent {

  owner_name = environment.owner_name;
  owner_email = environment.owner_email;
  owner_address = environment.owner_address;

}
