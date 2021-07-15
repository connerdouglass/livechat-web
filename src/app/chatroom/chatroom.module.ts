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
import { ChatRoomRoutingModule } from './chatroom-routing.module';
import { ChatRoomComponent } from './chatroom.component';

@NgModule({
	declarations: [
		ChatRoomComponent,
	],
	imports: [
		CommonModule,
		ChatRoomRoutingModule,
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
export class ChatRoomModule {}
