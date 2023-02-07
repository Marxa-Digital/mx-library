import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PdpRouteComponent } from "./pdp-route.component";

describe("PdpRouteComponent", () => {
	let component: PdpRouteComponent;
	let fixture: ComponentFixture<PdpRouteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PdpRouteComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PdpRouteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});
});
