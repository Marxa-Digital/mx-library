import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { RouterModule } from "@angular/router";
import { GlobalPipesModule } from "src/app/pipes/global-pipes.module";
import { MxPdpCheckboxComponent } from "./pdp-checkbox.component";
import { PdpHrefComponent } from "./pdp-href/pdp-href.component";
import { PdpRouteComponent } from "./pdp-route/pdp-route.component";

@NgModule({
	declarations: [PdpHrefComponent, PdpRouteComponent, MxPdpCheckboxComponent],
	imports: [CommonModule, MatCheckboxModule, GlobalPipesModule, ReactiveFormsModule, RouterModule],
	exports: [PdpHrefComponent, PdpRouteComponent, MxPdpCheckboxComponent],
})
export class PdpCheckboxModule {}
