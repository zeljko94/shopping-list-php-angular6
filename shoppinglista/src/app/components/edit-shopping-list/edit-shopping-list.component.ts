import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styles: []
})
export class EditShoppingListComponent implements OnInit {
  shoppingList?: any = {};
  namirnice?: any[] = [];
  chkAll: boolean = false;

  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router: Router) { }

    ngOnInit(){
      this.shoppingList = JSON.parse(localStorage.getItem("edit-shopping-list"));
      this.restService.get("namirnica/foruser/" + this.authService.getUser().ID, {})
        .subscribe(data => {
          //console.log(this.shoppingList);
          this.namirnice = data;
          this.updateTotal();
        });
    }

    chkAllOnChange(){
      for(var i=0; i<this.shoppingList.Items.length; i++){
        this.shoppingList.Items[i].IsDone = this.chkAll;
      }
    }

    chkNormalOnChange(item){
      item.IsDone = !item.IsDone;
      if(this.isAllChecked()){
        this.shoppingList.ShoppingList.IsDone = true;
      }
      else{
        this.shoppingList.ShoppingList.IsDone = false;
      }
    }

    isAllChecked(){
      var checked = this.shoppingList.Items.filter(it => it.IsDone == true);
      return checked.length == this.shoppingList.Items.length;
    }

    getNazivNamirnice(id){
      var n = this.namirnice.find(na => na.ID == id);
      return n != null ? n.Naziv : "";
    }

    getCijenaNamirnice(id){
      var n = this.namirnice.find(na => na.ID == id);
      return n != null ? n.Cijena : "";
    }

    getItemTotal(item){
      var rez = 0;
      var n = this.namirnice.find(na => na.ID == item.NamirnicaID);
      rez = item.Kolicina * (n != null ? n.Cijena : 0);
      return rez;
    }

    updateTotal(){
      var total = 0;
      for(var i=0; i<this.shoppingList.Items.length; i++){
        var namirnica = this.namirnice.find(n => n.ID == this.shoppingList.Items[i].NamirnicaID);
        total += this.shoppingList.Items[i].Kolicina * namirnica.Cijena;
      }
      this.shoppingList.ShoppingList["Total"] = total;
    }


    save(){
      var data = {
        ShoppingList: {
          ID: this.shoppingList.ShoppingList.ID,
          IsDone: this.isAllChecked()
        },
        Items: []
      };

      for(var i=0; i<this.shoppingList.Items.length; i++){
        data.Items.push({
          ID: this.shoppingList.Items[i].ID,
          IsDone: this.shoppingList.Items[i].IsDone
        });
      }

      this.restService.post("shoppinglist/updateisdone", JSON.stringify(data))
        .subscribe(data => {
          this.swalService.showSuccess("Success!", "Izmjene uspješno spremljene!");
        });
    }
}
