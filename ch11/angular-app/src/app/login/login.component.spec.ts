import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BroadcastService, EventKeys } from '../services/broadcast.service';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

describe('/src/app/login/login.component.ts', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let broadcastService: BroadcastService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                FormBuilder,
                BroadcastService
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        broadcastService = TestBed.inject(BroadcastService);
        spyOn(broadcastService, 'broadcast');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set form fields correctly on startup', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm?.value.username).toEqual("");
        expect(component.loginForm?.value.password).toEqual("");

    });

    it('should set form validity correctly', () => {
        expect(component.isFormValid()).toBeFalse();
        component.loginForm?.controls["username"].setValue("test_username");
        expect(component.isFormValid()).toBeFalse();
        component.loginForm?.controls["password"].setValue("test_password");
        expect(component.isFormValid()).toBeTrue();
    });

    it('should broadcast an event when the Login button is clicked', () => {
        component.loginForm?.controls["username"].setValue("test_username");
        component.loginForm?.controls["password"].setValue("test_password");

        fixture.detectChanges();
        const loginButton = fixture.debugElement
            .nativeElement.querySelector("#submit_button");
        expect(loginButton.disabled).toBeFalsy();

        loginButton.click();

        expect(broadcastService.broadcast)
            .toHaveBeenCalledWith(
                EventKeys.USER_LOGIN_EVENT,
                "test_username");
    });

});

