import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication/authentication.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  userName: string = '';
  public users: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.listUsers();
  }

  public logOut() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/login');
    swal.fire('Log Out!','','success');
    setTimeout(() => {
      if(swal.isVisible()) {
        swal.close();
      }
    },2000);
  }

  public listUsers() {
    let data= {
    };
    this.authService.listUsers(data).subscribe((result:any)=> {
      this.users = result;
      console.log("INSIDE TS:", result);
    })
  }
}
