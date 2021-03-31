import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AngularBroadcastService } from './services/broadcast.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ScriptLoaderService } from './services/ScriptLoaderService';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserDetailsComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [
        AngularBroadcastService,
        ScriptLoaderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
