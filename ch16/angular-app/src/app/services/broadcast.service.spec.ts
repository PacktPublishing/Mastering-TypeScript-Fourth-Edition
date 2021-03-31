import { TestBed } from '@angular/core/testing';

import { AngularBroadcastService } from './broadcast.service';

describe('BroadcastService', () => {
    let service: AngularBroadcastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AngularBroadcastService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
