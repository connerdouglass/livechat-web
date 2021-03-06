import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { DashChatComponent } from './dashboard/chat/chat.component';
import { StudioDashboardComponent } from './dashboard/dashboard.component';
import { StudioLoginPageComponent } from './login/login.component';
import { StudioRoutingModule } from './studio-routing.module';

@NgModule({
	declarations: [
		StudioLoginPageComponent,
		StudioDashboardComponent,
		DashChatComponent,
	],
	imports: [
		CommonModule,
		StudioRoutingModule,
		SharedModule,
		FormsModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatTooltipModule,
		MatRippleModule,
	],
	providers: [],
})
export class StudioModule {}
