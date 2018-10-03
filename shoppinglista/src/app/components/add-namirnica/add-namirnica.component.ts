import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-namirnica',
  templateUrl: './add-namirnica.component.html',
  styles: []
})
export class AddNamirnicaComponent implements OnInit {
  namirnica: any = {};
  
  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
  }

  isNumber(v){
    return parseFloat(v);
  }

   cijenaFocusOut(e){
    if(e.target.value == ""){
      e.target.value = "0";
      this.namirnica.Cijena = 0;
    }
  }


  cijenaInputKeyPress(e){
    const pattern = /[0-9.]/;

    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  save(){
    if(this.namirnica.Naziv){
      if(this.namirnica.Cijena){
        if(this.isNumber(this.namirnica.Cijena)){
          this.namirnica["UserID"] = this.authService.getUser().ID;
          if(!this.namirnica.ImgPath)
            this.namirnica.ImgPath = "";

            //this.namirnica.Cijena = (Math.round((this.namirnica.Cijena * 1000)/10)/100).toFixed(2);
          this.restService.post("namirnica/insert", JSON.stringify(this.namirnica))
            .subscribe(data => {
              if(data == -1){
                this.swalService.showError("Greška!", "Greška prilikom unosa namirnice!");
              }
              else{
                this.swalService.showSuccess("Success!", "Namirnica uspješno unešena!");
                this.router.navigate(['/namirnice']);
              }
            });
        }
      }
    }
  }

}
