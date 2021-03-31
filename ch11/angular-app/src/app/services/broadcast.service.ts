import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { filter, map } from 'rxjs/operators';

export interface IBroadcastEvent {
    key: EventKeys;
    data?: any;
}

export enum EventKeys {
    ALL = "all-events",
    LOGIN_BUTTON_CLICKED = "login_button_clicked",
    USER_LOGIN_EVENT = "user_login_event"
}

@Injectable({
    providedIn: 'root'
})
export class BroadcastService {

    private eventBus = new Subject<IBroadcastEvent>();

    on(key: EventKeys): Observable<string> {
        return this.eventBus.asObservable().pipe(
            filter(
                event => event.key === key ||
                    event.key === EventKeys.ALL),
            map(event => event.data));
    }

    broadcast(key: EventKeys, data: string) {
        this.eventBus.next({ key, data });
    }
}
