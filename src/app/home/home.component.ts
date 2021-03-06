import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestsService} from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];

  friendEmail: string = '';
  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private modalService: NgbModal, private requestsService: RequestsService) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
        this.users = data;

        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
        
      }, (error) => {
        console.log(error);
      });
      this.authenticationService.getStatus().subscribe((status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
          this.user = data;
        });
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


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, 
    (reason) => {

    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestsService.createRequest(request).then(() => {
      alert('Solicitud Enviada');
    }).catch((error) => {
      alert('Hubo un error');
      console.log(error);
    });
  }


}
