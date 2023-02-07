import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PdpHrefComponent } from "./pdp-href.component";

describe("PdpHrefComponent", () => {
	let component: PdpHrefComponent;
	let fixture: ComponentFixture<PdpHrefComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PdpHrefComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PdpHrefComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});
});
