import { inject, Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

export interface ContactData{
    name:string
    email:string
    objet?:string
    message:string
    website:string
}

@Injectable({"providedIn":"root"})
export class Contacts {
    private http = inject(HttpClient)
    send(data:ContactData){
        return this.http.post('api/contact',data)
    }
}
