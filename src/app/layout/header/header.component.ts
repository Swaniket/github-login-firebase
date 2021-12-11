import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: any = null; // null is considered as a falsy value

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Fill the value of email before the component mounts
    auth.getUser().subscribe((user) => {
      this.email = user?.email;
    });
  }

  // As the signout will be happening over the web, this method needs to be async
  async handleSignOut() {
    try {
      await this.auth.signOut();
      // Redirect after signout
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login again to continue!');
      this.email = null;
    } catch (error) {
      this.toastr.error('Something is wrong!');
    }
  }

  ngOnInit(): void {}
}
