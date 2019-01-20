import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  userId: any;
  constructor(private activatedRouter: ActivatedRoute) { 

    this.userId = this.activatedRouter.snapshot.params['uid'];

  }

  ngOnInit() {
  }

}
