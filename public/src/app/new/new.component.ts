import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet: any;
  pets = [];
  errors: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.errors = [];
    this.newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
  }
  createPet() {
    this._httpService.createPet(this.newPet).subscribe(pet => {
      console.log('peeeeeet', pet)
      if (pet['message'] === 'error') {
        this.errors = pet['error']['errors'];
        this.newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: '' };
      }
      else {
        this.goToDashboard();
      }
    })
  }
  goToDashboard() {
    this._router.navigate(['pets']);
  }
}