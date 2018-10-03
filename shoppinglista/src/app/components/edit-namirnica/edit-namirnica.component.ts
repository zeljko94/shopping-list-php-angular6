import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-namirnica',
  templateUrl: './edit-namirnica.component.html',
  styles: []
})
export class EditNamirnicaComponent implements OnInit {
  namirnica: any = {};

  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    this.namirnica = JSON.parse(localStorage.getItem("edit-namirnica"));
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

          this.restService.post("namirnica/update", JSON.stringify(this.namirnica))
            .subscribe(data => {
              if(data == -1){
                this.swalService.showError("Greška!", "Greška prilikom izmjene namirnice!");
              }
              else{
                this.swalService.showSuccess("Success!", "Izmjene uspješno spremljene!");
                this.router.navigate(['/namirnice']);
              }
            });
        }
      }
    }
  }

}
