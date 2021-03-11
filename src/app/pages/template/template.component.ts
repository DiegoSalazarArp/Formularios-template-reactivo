import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Diego',
    apellido: 'Salazar',
    correo: 'd.salazararp@gmail.com',
    pais: '',
    genero: 'M'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((paises) => {
      this.paises = paises;

      this.paises.unshift({
        nombre: '[Seleccione un país]',
        codigo: '',
      });
      console.log(paises);
    });
  }

  // tslint:disable-next-line: typedef
  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        // Marca todos los datos como 'touched'
        control.markAsTouched();
      });
    }
    console.log(forma.value);
  }
}
