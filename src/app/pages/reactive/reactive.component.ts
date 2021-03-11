import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
// @ts-ignore
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListener();
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  // tslint:disable-next-line: typedef
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return (
      this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    );
  }

  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito').invalid &&
      this.forma.get('direccion.distrito').touched
    );
  }

  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  crearFormulario() {
    this.forma = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        direccion: this.formBuilder.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.formBuilder.array([]),
      },
      {
        validators: this.validadores.passwordIguales('pass1', 'pass2'),
      }
    );
  }

  crearListener() {
    // this.forma.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });


    // tslint:disable-next-line: deprecation
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }
  cargarDataFormulario() {
    this.forma.reset({
      nombre: 'Diego',
      apellido: 'Salazar',
      correo: 'd.salazararp@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Algo',
        ciudad: 'Santiago',
      },
    });
    // ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
  }

  agregarPasatiempo() {
    this.pasatiempos.push(
      this.formBuilder.control('Nuevo elemento', Validators.required)
    );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          // Marca todos los datos como 'touched'
          control.markAsTouched();
        }
      });
    }
    // Posteo de información
    this.forma.reset({
      nombre: 'Sin nombre',
    });
  }
}
