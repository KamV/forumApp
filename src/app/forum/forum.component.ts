import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { ThemeItem } from '../declarations';
import { ForumDialogComponent } from './forum-dialog/forum-dialog.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  form: FormGroup;

  showAdminMenu = false;

  themes: ThemeItem[] = [];

  currentUser: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    public dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.currentUser && this.currentUser.role == 'ADMIN') {
      this.showAdminMenu = true;
    } else {
      this.showAdminMenu = false;
    }

    this.form = this.formBuilder.group({
        title: ''
    });

    this.forumService.getThemes().subscribe(resp => {
      this.themes = resp.themes;
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  openDialog(theme: ThemeItem) {
    let dialogRef = this.dialog.open(ForumDialogComponent, {
      width: '600px',
      height: 'auto',
      data: { theme: theme }
    });

  }

  showConversation(theme: ThemeItem) {
    this.router.navigate(['conversation', theme.themeId]);
  }

  addTheme() {
    this.forumService.addTheme(this.form.value).subscribe(resp => {
      this.themes.push(resp);

      this.form.reset();
    },
    error => {
          this.router.navigate(['signin']);
    });
  }

  deleteTheme(theme: ThemeItem) {
    this.forumService.deleteTheme(theme.themeId).subscribe(resp => {
      this.themes.splice(this.themes.indexOf(resp), 1);
    },
    error => {
          this.router.navigate(['signin']);
    });

  }

  logout() {
    this.authService.logout();
  }

}
