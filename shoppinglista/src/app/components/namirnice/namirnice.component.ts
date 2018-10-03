import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-namirnice',
  templateUrl: './namirnice.component.html',
  styles: []
})
export class NamirniceComponent implements OnInit {
  namirniceStore?: any[] = [];
  namirnice?: any[] = [];
  searchTxt: string;

  constructor(private restService: RestService,
              private swalService: SwalService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.restService.get("namirnica/foruser/" + this.authService.getUser().ID, {})
      .subscribe(data => {
        this.namirniceStore = data;
        this.namirnice = data;
      });
  }

  edit(n){
    localStorage.setItem("edit-namirnica", JSON.stringify(n));
    this.router.navigate(['/edit-namirnica']);
  }

  applyFilters(){
    this.namirnice = this.namirniceStore;
    if(this.searchTxt){
      this.namirnice = this.namirnice.filter(n => n.Naziv.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
      n.Cijena.toString().toLowerCase().includes(this.searchTxt.toLowerCase()));
    }
  }

  delete(id){
    this.restService.get("namirnica/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja namirnice!");
        }
        else{
          this.swalService.showSuccess("Success!", "Namirnica uspješno obrisana!");
          this.namirnice = this.namirnice.filter(n => n.ID != id);
        }
      });
  }

}
