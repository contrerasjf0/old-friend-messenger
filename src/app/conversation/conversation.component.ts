import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  userId: any;
  users: User[];
  user: User;

  constructor(private activatedRouter: ActivatedRoute,
              private userService: UserService) { 

    this.userId = this.activatedRouter.snapshot.params['uid'];

    this.users = this.userService.getUsers();

    this.user=this.users.find( (record) => {
      return record.uid == this.userId;
    });
    console.log(this.user);

  }

  ngOnInit() {
  }

}
