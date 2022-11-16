import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: any = {password: null};
  isSuccessful = true;
  isResetPasswordFailed = false;
  errorMessage = '';
  token!: string;
  constructor(private authService: AuthService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.token=params['token'];
      console.log("hi",this.token); 
    });
  }

onSubmit() {
  const {password} = this.form;
 this.authService.resetpassword(this.token,password).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isResetPasswordFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isResetPasswordFailed = true;
      this.isSuccessful = false;
    }
  );
  this.router.navigate(['login']) ;

}
}

