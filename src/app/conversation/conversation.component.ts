import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { MessageItem } from '../declarations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ChangeMessageDialogComponent } from './change-message-dialog/change-message-dialog.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  form: FormGroup;

  showAdminMenu = false;
  currentUser: any;

  private themeId: number;
  private subscription: Subscription;

  messages: MessageItem[] = [];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute) {
      this.subscription = activateRoute.params.subscribe(params=>this.themeId=params['themeId']);
    }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser && this.currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        body: ''
    });

    this.forumService.getMessages(this.themeId).subscribe(resp => {
      this.messages = resp.messages;
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  openDialog(message: MessageItem) {
    let dialogRef = this.dialog.open(ChangeMessageDialogComponent, {
      width: '600px',
      height: 'auto',
      data: { message: message }
    });

  }

  addMessage () {
    this.forumService.addMessage(this.form.value, this.themeId).subscribe(resp => {
      this.messages.push(resp);

      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  deleteMessage(message: MessageItem) {
    this.forumService.deleteMessage(message.messageId).subscribe(resp => {
      this.messages.splice(this.messages.indexOf(message), 1);
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  logout() {
    this.authService.logout();
  }

}
