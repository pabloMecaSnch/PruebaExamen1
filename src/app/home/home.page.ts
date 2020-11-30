import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';
import { Usuario } from '../entidades/Usuario';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formulario : FormGroup;
  validador : FormGroup;
  usuarios = [
    {
      "id": 1,
      "usuario": "pedro",
      "password": "1234"
    },
    {
      "id": 2,
      "usuario": "marta",
      "password": "5678"
    }
  ];
  validator_messages={
  };
  constructor(
    public formBuilder : FormBuilder,
    private navCtlr : NavController
    ) {}

    formularioValido(fg : FormGroup){
      return (null);
    }

    validUsername(nombre : FormControl){
      var nUsuario:string = nombre.value;
     // var nUsuario: string = nombre
      var enc = false;
      this.usuarios.forEach(element => {
        if(element.usuario == nUsuario){
          enc = true;
          console.log(nombre);
        }
      });
        if(!enc){
          return({validUsername:true});
        }else{
          return (null);
        }
    }
    validPassword(contrasena : string,nombre:string){
      var contrasena:string = contrasena;
      var nombre :string= nombre;
      var correcto = false;
      this.usuarios.forEach(element => {
        if(element.usuario==nombre){
          if(element.password==contrasena){
            correcto=true;
          }
        }
      });
      if(correcto)
        return null;
      else{
        return({validPassword:true});
      }
    }
    validForm(fg : FormGroup){
      var nombre:string =fg.controls['nombre'].value;
      var contrasena:string = fg.controls['contrasena'].value;
     /* if(this.validUsername(nombre)){
        return({validForm:true})
        }*/
      if(this.validPassword(contrasena,nombre)){
        return({validForm:true});
      }
     
    }
  ngOnInit(){
     

      this.validador = new FormGroup({
        nombre : new FormControl('',Validators.compose([
          this.validUsername,
          Validators.required,
          Validators.minLength(3),
          
        ])),
        contrasena : new FormControl('',Validators.required)
      }, (formGroup:FormGroup) => {
        return this.validForm(formGroup);
      });

      this.formulario = this.formBuilder.group({
        validador : this.validador
      });

  }

  
  onSubmit(values){
    console.log(values);
    let navigationExtras : NavigationExtras = {
      queryParams:{
        user: JSON.stringify(values)
      }
    };
    this.navCtlr.navigateForward('/user',navigationExtras);
  }

}
