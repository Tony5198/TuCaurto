import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './confirm-equal-validator';
import { MailService } from 'src/app/service/mail.service';
import swal from 'sweetalert2';
import { User } from 'src/app/service/authentication.service';

const baseUrl = 'http://localhost:8001/user/register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  };
  submitted = false;
  loading = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private mailService: MailService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: [null, Validators.required],
        username: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        contactNumber: [
          null,
          [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  saveUser() {
    const data = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      contactNumber: this.user.contactNumber,
    };

    this.httpClient.post(baseUrl, data, { responseType: 'text' }).subscribe(
      (response) => {
        this.loading = true;
        console.log(response);
        if (response === 'Username already Taken') {
          swal.fire('Error', 'username already taken!! Try again.', 'error');
          this.submitted = false;
          this.loading = false;
        } else {
          this.loading = true;
          this.mailService.sendRegisterMail(data).subscribe((response) => {
            console.log(response);

            this.submitted = true;
            swal.fire(
              'User created',
              'Your account has been successfully created',
              'success'
            );
            this.router.navigate(['/login']);
          });
        }
      },
      (error) => {
        this.loading = false;
        swal.fire('Error', 'Something went wrong!', 'error');
      }
    );
  }
}
