import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MxPdpCheckboxComponent } from "./pdp-checkbox.component";

describe("PdpCheckboxComponent", () => {
	let component: MxPdpCheckboxComponent;
	let fixture: ComponentFixture<MxPdpCheckboxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MxPdpCheckboxComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MxPdpCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});
});
