import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AngularBroadcastService, EventKeys } from './services/broadcast.service';
import * as _ from "lodash";
import { ScriptLoaderService } from './services/ScriptLoaderService';

import { MicroEventBus } from 'micro-event-bus';
export let microEventBus: MicroEventBus =
    (window as any).microEventBus;

declare let Vue: any;
declare let ShoppingCartVue: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-app';
    hideProducts: boolean = false;
    hideShoppingCart: boolean = true;
    hideOrderPlaced: boolean = true;
    hideShoppingCartRegion: boolean = false;
    username: string = "";

    shoppingCartStyles = "split right";

    @ViewChild("sidenav") sidenav: MatSidenav | null = null;

    constructor(
        broadCastService: AngularBroadcastService,
        private scriptLoaderService: ScriptLoaderService,
        private cd: ChangeDetectorRef
    ) {
        _.bindAll(this, [
            "onLoginClicked",
            "onLoginEvent",
            "toggleCheckoutOnly",
            "toggleContinueShopping",
            "togglePlaceOrder"
        ]);
        broadCastService.on(EventKeys.LOGIN_BUTTON_CLICKED)
            .subscribe(this.onLoginClicked);
        broadCastService.on(EventKeys.USER_LOGIN_EVENT)
            .subscribe(this.onLoginEvent);


        microEventBus.on("checking-out")
            .subscribe(this.toggleCheckoutOnly);

        microEventBus.on("continue-shopping")
            .subscribe(this.toggleContinueShopping);

        microEventBus.on("place-order")
            .subscribe(this.togglePlaceOrder);

    }

    ngOnInit() {
        // createReactApp();
        this.scriptLoaderService.loadAllScripts(
            "/assets/react/build/static/js/2.c1473afa.chunk.js",
            "/assets/react/build/static/js/main.f4a103d4.chunk.js"
        ).subscribe(() => {
            console.log(`script loaded`);
        });
        Vue.createApp(ShoppingCartVue).mount('#vue-application');

    }

    onLoginClicked(event: string) {
        console.log(`AppComponent received : ${event}`);

        this.sidenav?.open();
    }
    onLoginEvent(username: string) {
        this.sidenav?.close();
        this.hideShoppingCart = false;
        this.username = username;
    }

    toggleCheckoutOnly() {
        this.shoppingCartStyles = "split";
        this.hideProducts = true;
        this.cd.detectChanges();
    }

    toggleContinueShopping() {
        this.shoppingCartStyles = "split right";
        this.hideProducts = false;
        this.cd.detectChanges();

    }
    togglePlaceOrder() {
        this.hideShoppingCartRegion = true;
        this.hideProducts = true;
        this.hideOrderPlaced = false;
        this.cd.detectChanges();
    }
}
