import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NamirniceComponent } from './components/namirnice/namirnice.component';
import { PostavkeProfilaComponent } from './components/postavke-profila/postavke-profila.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNamirnicaComponent } from './components/add-namirnica/add-namirnica.component';
import { AddShoppingListComponent } from './components/add-shopping-list/add-shopping-list.component';
import { EditShoppingListComponent } from './components/edit-shopping-list/edit-shopping-list.component';
import { EditNamirnicaComponent } from './components/edit-namirnica/edit-namirnica.component';





const APP_ROUTES: Routes = [
    {path: '', component: LoginComponent},

    {path: 'login', component: LoginComponent},

    {path: 'register', component: RegisterComponent},

    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'add-shopping-list', component: AddShoppingListComponent},
    {path: 'edit-shopping-list', component: EditShoppingListComponent},

    {path: 'namirnice', component: NamirniceComponent},
    {path: 'add-namirnica', component: AddNamirnicaComponent},
    {path: 'edit-namirnica', component: EditNamirnicaComponent},

    {path: 'postavke-profila', component: PostavkeProfilaComponent},
 
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

