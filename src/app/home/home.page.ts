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

  user : Usuario;
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

  getPrueba(){
    return "hola";
  }


  constructor(
    public formBuilder : FormBuilder,
    private navCtlr : NavController
    ) {}

    formularioValido(fg : FormGroup){
      return (null);
    }

    validUsername(nombre : FormControl){
      console.log("entro al metodo de validar usuario")
      var nUsuario:string = nombre.value;
      var enc = false;
      console.log(this.getPrueba());
      /*this.usuarios.forEach(element => {
        console.log("entro al bucle");
        
        if(element.usuario == nombre.value){
          //enc = true;
          //console.log(nombre);
        }
        
      });
      
        if(!enc){
          return({validUsername:true});
        }else{
          return (null);
        }
        */
       return null;
    }

    validPassword(contrasena : string,nombre:string){
      var contrasena:string = contrasena;
      var nombre :string= nombre;
      var correcto = false;
      this.usuarios.forEach(element => {
        if(element.usuario==nombre){
          if(element.password==contrasena){
            correcto=true;
            this.user = new Usuario(element.id,element.usuario,element.password);
          }
        }
      });
      if(correcto)
        return false;
      else{
        return(true);
      }
    }
    validForm(fg : FormGroup){
      var nombre:string =fg.controls['nombre'].value;
      var contrasena:string = fg.controls['contrasena'].value;
      if(this.validPassword(contrasena,nombre)){
        return({validForm:true});
      }else{
        return (null);
      }
     
    }
  ngOnInit(){
     

      this.validador = new FormGroup({
        nombre : new FormControl('',Validators.compose([
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
        user: JSON.stringify(this.user)
      }
    };
    this.navCtlr.navigateForward('/user',navigationExtras);
  }

}
