import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Personaje } from 'src/app/interfaces/Personaje';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    personajes: Personaje[] | undefined;
    personajesCopy: Personaje[] | undefined;

    constructor(public http: HttpClient) { }

    ngOnInit(): void {
        this.getData();
    }

    filter(e: any) {
        const search: string = e.target.value;
        /* console.log({search}); */
        
        // la copia para no sobrescribir el array- desestructurando name
        this.personajes = this.personajesCopy?.filter(({name}: Personaje) => {
            return name.toLowerCase().includes(search.toLowerCase());
        });
    }

    async getData() {
        await this.http.get<any>(environment.apiUrl + '/characters')
            .subscribe(res => {
                //console.table(res);
                // desestructuracion de objects
                this.personajes = res.map(({char_id, name, nickname, img, status, occupation}: Personaje) => {
                    return {
                        char_id: char_id,
                        name: name,
                        nickname: nickname,
                        img: img,
                        status: status,
                        occupation: occupation,
                    };
                });

                this.personajesCopy = this.personajes;
            });

            
    };

}
