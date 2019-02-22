import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  pets = [];

  ngOnInit() {
    this.getAllPets();
  }
  getAllPets() {
    this._httpService.getPets().subscribe(all_pets => this.pets = all_pets['data'])
  }
}
