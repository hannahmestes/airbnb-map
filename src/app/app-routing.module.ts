import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC0-e-LMelOmiIBz-PpBapJN6VYw501quE'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
