import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pets = [];
  details: any;
  pet: any = {
    name: '',
    type: '',
    description: '',
    skill1: '',
    skill2: '',
    skill3: ''
  }
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {

  }
  ngOnInit() {
    this.getAllPets();
    this._route.params.subscribe((params: Params) => {
      this.getOnePet(params['id'])
    });
  }
  deletePet(id: string) {
    this._httpService.deletePet(id).subscribe(pet => this.pets = pet['data'])
    this.goToDashboard()
  }
  // getAllPets() {
  //   this._httpService.getPets().subscribe(all_pets => this.pets = all_pets['data'])
  // }
  getOnePet(id: string) {
    this._httpService.getPet(id).subscribe(pet => {
      console.log('ppppp', pet)
      this.details = pet['data']
    })
  }
  goToDashboard() {
    this._router.navigate(['/']);
  }
  getAllPets() {
    this._httpService.getPets().subscribe(all_pets => this.pets = all_pets['data'])
  }
}
