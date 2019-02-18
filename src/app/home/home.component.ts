import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
        this.users = data;
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then(() => {
      alert('Sesioon Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
