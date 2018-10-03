import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { isEmpty } from 'rxjs/operators';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shopping-list',
  templateUrl: './add-shopping-list.component.html',
  styles: []
})
export class AddShoppingListComponent implements OnInit {
  shoppingList: any = {
    Items: [],
    Total: 0
  };

  namirnice: any[] = [];
  dodaneNamirnice: any[] = [];

  constructor(private restService: RestService,
              private authService: AuthService,
              private swalService: SwalService,
              private router: Router) { }

  ngOnInit() {
    var UserID = this.authService.getUser().ID;
    this.restService.get("namirnica/foruser/" + UserID, {})
      .subscribe(data => {
        this.namirnice = data;
        if(data.length <= 0){
          this.swalService.showError("Greška!", "Nema unesenih namirnica u bazi! <br>Prije sastavljanja liste potrebno je prvo unijeti namirnice.");
          this.router.navigate(['/namirnice']);
        }
      });
  }

  formatDate(date){
    return this.addTrailingZero(date.getDate()) + "-" + this.addTrailingZero(date.getMonth()) + "-" + date.getFullYear() + " " + this.addTrailingZero(date.getHours()) + ":" + this.addTrailingZero(date.getMinutes()) + ":" + this.addTrailingZero(date.getSeconds());
  }

  addTrailingZero(s){
    return s<10 ? "0" + s : s;
  }

  kolicinaFocusOut(e,item){
    if(e.target.value == ""){
      e.target.value = "0";
      item.Kolicina = "0";
    }
  }

  kolicinaInputKeyPress(e){
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  kolicinaInputKeyUp(e, item){
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();

      this.updateItemTotal(item);
    }
    else{  
      this.updateItemTotal(item);
    }
  }

  updateItemTotal(item){
    item.Total = item.Namirnica.Cijena * item.Kolicina;
    if(isNaN(item.Total))
      item.Total = 0;

    this.updateTotal();
  }

  updateTotal(){
    var total = 0;
    for(var i=0; i<this.shoppingList.Items.length; i++){
      //total += this.shoppingList.Items[i].Kolicina * this.shoppingList.Items[i] 
      total += this.shoppingList.Items[i].Total;
    }
    this.shoppingList.Total = total;
  }

  ch(n, item){
    item.Namirnica = n;
    this.updateItemTotal(item);
  }


  remove(i){
   this.shoppingList.Items.splice(i, 1);
   this.updateTotal();
  }

  add(){
    this.shoppingList.Items.push({
      Namirnica: this.namirnice.length > 0 ? this.namirnice[0] : {},
      Kolicina: 1,
      Total: this.namirnice.length > 0 ? this.namirnice[0].Cijena : 0,
      IsDone: false
    });
    this.updateTotal();
  }



  save(){
    if(this.shoppingList.Naziv){
      if(this.shoppingList.Items.length > 0){
        this.shoppingList["DatumKreiranja"] = this.formatDate(new Date());
        this.shoppingList["IsDone"] = false;
        
        var json = JSON.stringify({
          ShoppingList: {
            Naziv: this.shoppingList.Naziv,
            DatumKreiranja: this.formatDate(new Date()),
            UserID: this.authService.getUser().ID,
            IsDone: this.shoppingList["IsDone"]
          },
          Items: this.shoppingList.Items
        });

        console.log(JSON.parse(json));

        this.restService.post("shopping-list/insertwithitems", json)
          .subscribe(data => {
            if(data){
              this.swalService.showSuccess("Success!", "Shopping lista uspješno spremljena!");
              this.router.navigate(['/shopping-list']);
            }
            else{
              this.swalService.showError("Greška!", "Greška prilikom unosa liste!");
            }
          });
          
      }
      else{
        this.swalService.showError("Greška!", "Nema unesenih namirnica!");
      }
    }
    else{
      this.shoppingList.Naziv = "";
    }
  }
}
