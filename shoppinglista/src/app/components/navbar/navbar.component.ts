import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  menuItems: any[] = [
    /*{
      label: "Početna",
      active: true,
      link: "/shopping-list"
    },*/
    {
      label: "Shopping liste",
      active: false,
      link: "/shopping-list"
    },
    {
      label: "Namirnice",
      active: false,
      link: "/namirnice"
    }
  ];

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  menuItemOnClick(item){
    item.active = true;
    this.menuItems.forEach(menuItem => {
      if(menuItem != item){
        menuItem.active = false;
      }
    });
  }

}
