// 
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface IDomainEventKey {
    "checking-out": null;
    "continue-shopping": null;
    "place-order": null;
    "user-logged-in": string;
    "add-user-cart-item": IAddUserCartItemData;
}

interface IAddUserCartItemData {
    productId: number;
    username: string;
    amount: number;
}

export interface IBroadcastEvent
    <T extends keyof IDomainEventKey> {
    key: T;
    data?: IDomainEventKey[T];
}




export class MicroEventBus {
    private eventBus = new Subject<any>();

    on<T extends keyof IDomainEventKey>
        (key: T): Observable<IDomainEventKey[T] | undefined> {
        console.log(`BCST: on(${key})`)
        return this.eventBus.asObservable().pipe(
            filter(
                (event: IBroadcastEvent<T>) => event.key === key),
            map(
                (event: IBroadcastEvent<T>) => event.data));
    }

    broadcast<T extends keyof IDomainEventKey>
        (key: T, data: IDomainEventKey[T]) {

        console.log(`BCST: broadcast: ${key} : ${data}`)
        this.eventBus.next({ key, data });
    }
}

interface IWindowEventBus {
    microEventBus: MicroEventBus;
}

declare let window: IWindowEventBus;

if (window.microEventBus === undefined) {
    console.log(`BCST : window.microEventBus = undefined,
        setting window.microEventBus`);
    window.microEventBus = new MicroEventBus();
}

