import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BroadcastService, EventKeys } from '../services/broadcast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private broadcastService: BroadcastService
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

    onSubmit() {
        console.log(`onSubmit: username : ${this.loginForm?.value.username}`);
        console.log(`onSubmit: password : ${this.loginForm?.value.password}`);

        this.broadcastService.broadcast(
            EventKeys.USER_LOGIN_EVENT,
            this.loginForm?.value.username);
    }

}
