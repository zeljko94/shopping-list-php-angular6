import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routes';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NamirniceComponent } from './components/namirnice/namirnice.component';
import { PostavkeProfilaComponent } from './components/postavke-profila/postavke-profila.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNamirnicaComponent } from './components/add-namirnica/add-namirnica.component';
import { AddShoppingListComponent } from './components/add-shopping-list/add-shopping-list.component';
import { EditShoppingListComponent } from './components/edit-shopping-list/edit-shopping-list.component';
import { EditNamirnicaComponent } from './components/edit-namirnica/edit-namirnica.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ShoppingListComponent,
    NamirniceComponent,
    PostavkeProfilaComponent,
    RegisterComponent,
    AddNamirnicaComponent,
    AddShoppingListComponent,
    EditShoppingListComponent,
    EditNamirnicaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
