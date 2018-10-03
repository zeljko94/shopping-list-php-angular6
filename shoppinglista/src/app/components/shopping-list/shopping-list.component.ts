import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {
  shoppingListeStore: any[] = [];
  shoppingListe: any[] = [];
  searchTxt: string;
  obavljeneRadioBtn: any = "1";

  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    var UserID = this.authService.getUser().ID;
    this.restService.get("shoppinglist/getforuser/" + UserID, {})
      .subscribe(data => {
        this.shoppingListeStore = data;
        this.shoppingListe = data;
      });
  }
  
  applyFilters(){
    this.shoppingListe = this.shoppingListeStore;
    if(this.searchTxt){
      this.shoppingListe = this.shoppingListe.filter(sl => sl.ShoppingList.Naziv.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
      sl.ShoppingList.DatumKreiranja.toString().toLowerCase().includes(this.searchTxt.toLowerCase()));
    }

    if(this.obavljeneRadioBtn == '1'){
      this.shoppingListe = this.shoppingListe.filter(sl => sl.ShoppingList.IsDone == true || sl.ShoppingList.IsDone == false);
    }
    else if(this.obavljeneRadioBtn == '2'){
      this.shoppingListe = this.shoppingListe.filter(sl => sl.ShoppingList.IsDone == true);
    }
    else if(this.obavljeneRadioBtn == '3'){
      this.shoppingListe = this.shoppingListe.filter(sl => sl.ShoppingList.IsDone == false);
    }
  }


  edit(sl){
    this.restService.get("shopping-list/getwithitems/" + sl.ID, {})
      .subscribe(data => {
        localStorage.setItem("edit-shopping-list", JSON.stringify(data));
        this.router.navigate(['/edit-shopping-list']);
      });
  }

  delete(id){
    this.restService.get("shopping-list/delete/" + id, {})
      .subscribe(data => {
        if(data == -1){
          this.swalService.showError("Greška!", "Greška prilikom brisanja liste!");
        }
        else{
          this.swalService.showSuccess("Success!", "Lista uspješno obrisana!");
          this.shoppingListe = this.shoppingListe.filter(sl => sl.ShoppingList.ID != id);
          this.shoppingListeStore = this.shoppingListeStore.filter(sl => sl.ShoppingList.ID != id);
          this.router.navigate(['/shopping-list']);
        }
      });
  }
}
