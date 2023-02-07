import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MxAtLeastHref, MxAtLeastRoute, MxPDPFlexConfig } from "./pdp-checkbox.model";

@Component({
	selector: "mx-pdp-checkbox",
	templateUrl: "./pdp-checkbox.component.html",
	styleUrls: ["./pdp-checkbox.component.scss"],
})
export class MxPdpCheckboxComponent implements OnDestroy {
	@Input() config: MxPDPFlexConfig = {
		preLinkMsg: "I have been reading the ",
		postLinkMsg: " and I accept them",
		linkTextDisplay: "Privacy Policy",
		route: "privacy-policy",
	};
	pdpCtrl: FormControl = new FormControl(false, [Validators.required]);
	@Input() value: boolean = false;
	@Output() valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
	get route(): MxAtLeastRoute | null {
		return "route" in this.config ? this.config : null;
	}
	get href(): MxAtLeastHref | null {
		return "href" in this.config ? this.config : null;
	}
	#pdpCtrlSubscription: Subscription;
	constructor() {
		this.#pdpCtrlSubscription = this.pdpCtrl.valueChanges.subscribe(change => {
			this.valueChanged.emit(change);
		});
	}

	ngOnDestroy(): void {
		this.#pdpCtrlSubscription.unsubscribe();
	}
}
