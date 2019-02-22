import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getPets() {
    return this._http.get('/pets');
  }
  getPet(id: string) {
    return this._http.get('/pet/'+id);
  }
  createPet(pet: any) {
    return this._http.post('/pets/new',pet);
  }
  editPet(pet: any) {
    return this._http.put('/pets/'+pet._id+'/edit',pet);
  }
  deletePet(id: string) {
    return this._http.delete('/pets/' + id);
  }
}