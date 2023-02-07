import { Component, Input } from "@angular/core";
import { MxAtLeastHref } from "./../pdp-checkbox.model";

@Component({
	selector: "app-pdp-href",
	template: `
		<a [href]="config.href" [style.color]="config.linkColor" target="_blank " rel="noopener noreferrer ">
			{{ config.linkName }}
		</a>
	`,
})
export class PdpHrefComponent {
	@Input() config!: MxAtLeastHref;
}
