import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-postavke-profila',
  templateUrl: './postavke-profila.component.html',
  styles: []
})
export class PostavkeProfilaComponent implements OnInit {
  user?: any = this.authService.getUser() || {};
  RePassword: any;

  constructor(private authService: AuthService,
              private restService: RestService,
              private swalService: SwalService) { }

  ngOnInit() {
    this.RePassword = this.user.Password;
  }


  save(){
    if(this.user.Ime != ''){
      if(this.user.Prezime != ''){
        if(this.user.Email != ''){
          if(this.user.Password != ''){
            if(this.user.RePassword != ''){
              if(this.user.Password == this.RePassword){
                this.restService.post("user/update", JSON.stringify(this.user))
                  .subscribe(data => {
                    if(data == -1){
                      this.swalService.showError("Greška!", "Greška prilikom izmjene korisničkog profila!");
                    }
                    else{
                      this.swalService.showSuccess("Success!", "Korisnički profil uspješno izmjenjen!");
                      this.authService.login(this.user);
                    }
                  });
              }
            }
          }
        }
      }
    }
  }
}
