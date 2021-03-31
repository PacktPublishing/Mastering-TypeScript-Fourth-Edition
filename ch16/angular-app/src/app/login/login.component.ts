import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { microEventBus } from '../app.component';
import { AngularBroadcastService, EventKeys } from '../services/broadcast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup | null = null;
    errorMessage: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private broadcastService: AngularBroadcastService,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        console.log(`buildForm()`);
        this.buildForm();
    }

    buildForm() {
        let form = {
            username: new FormControl({}, Validators.required),
            password: new FormControl({}, Validators.required)
        }

        let formState = {
            username: {
                value: "",
                disabled: false
            },
            password: {
                value: "",
                disabled: false
            }
        }

        this.loginForm = this.formBuilder.group(form);
        this.loginForm.reset(formState);
    }

    isFormValid() {
        return this.loginForm?.valid;
    }

    onSubmit(event: any) {
        console.log(`event : ${event.submitter.id}`);
        // event.submitter.id
        console.log(`onSubmit: username : ${this.loginForm?.value.username}`);
        console.log(`onSubmit: password : ${this.loginForm?.value.password}`);


        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        let userUrl = "http://localhost:3000/users";
        if (event.submitter.id === "register_button") {
            userUrl = "http://localhost:3000/register";
        }

        this.http.post(userUrl,
            {
                username: this.loginForm?.value.username,
                password: this.loginForm?.value.password
            }
        ).subscribe(() => {
            console.log(`post complete`);
            // broadcast to angular components
            this.broadcastService.broadcast(
                EventKeys.USER_LOGIN_EVENT,
                this.loginForm?.value.username);
            // broadcast to micro front end apps

            microEventBus.broadcast(
                'user-logged-in',
                this.loginForm?.value.username
            )

        }, (error) => {
            console.log(`LoginComponent : error :  ${JSON.stringify(error, null, 4)}`);
            this.errorMessage = "An error occurred."
        })

    }

    hasError() {
        return this.errorMessage.length > 0;
    }

}
