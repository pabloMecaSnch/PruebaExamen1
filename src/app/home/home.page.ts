import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';


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
  validator_message
  constructor(
    public formBuilder : FormBuilder,
    private navCtlr : NavController
    ) {}

    formularioValido(fg : FormGroup){
      return (null);
    }

    validUsername(fg : FormGroup){
      let nUsuario = fg.controls['nombre'].value;
      
      let enc=false;
      //comprobacion de prueba para ver si la validacion funciona
      if(nUsuario === "pedro"){
        return({validUsername:true});
      }else{
        return (null);
      }
    }

  ngOnInit(){
     

      this.validador = new FormGroup({
        nombre : new FormControl('',Validators.compose([
          //this.validUsername,
          Validators.required,
          Validators.minLength(3),
          
        ])),
        contrasena : new FormControl('',Validators.required)
      }, (formGroup:FormGroup) => {
        return this.validUsername(formGroup);
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
