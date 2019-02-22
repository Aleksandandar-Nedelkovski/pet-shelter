import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { PetsComponent } from './pets/pets.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
    { path: 'pets',component: PetsComponent },
    { path: 'pets/:id/edit',component: EditComponent },
    { path: 'pets/new',component: NewComponent },
    { path: 'pets/:id',component: DetailsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'pets' }, 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }