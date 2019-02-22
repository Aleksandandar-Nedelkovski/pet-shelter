import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pets = [];
  pet: any;
  errors: any;
  updatedPet: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    // this.errors = '';
    this.errors = [];

    this.updatedPet = { name: '', type: '', description: '', skills: '' };
    this._route.params.subscribe((params: Params) => {
      this.getOnePet(params['id'])
    });
  }

  editPet() {
    this._httpService.editPet(this.updatedPet).subscribe(pet => {
      if (pet['message'] === 'error') {
        console.log('pett errrror', pet)
        this.errors = pet['message'];
        // this.updatedPet = { name: '', type: '', description: '', skills: '' }
        this._route.params.subscribe((params: Params) => {
          this.updatedPet = { name: '', type: '', description: '', skills: '' }
          this.getOnePet(params['id'])
        });
      } else {
        this.pet = pet['data']
        this.goToDashboard();
      }
    })
  }

  getOnePet(id: string) {
    this._httpService.getPet(id).subscribe(author => {
      this.updatedPet = author['data']
    })
  }

  goToDashboard() {
    this._router.navigate(['/']);
  }
}
