import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chatroom.component';

const routes: Routes = [
	{
		path: ':chat_room_identifier',
		component: ChatRoomComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoomRoutingModule {}
