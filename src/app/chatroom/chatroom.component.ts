import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatRoomComponent {

	public chat_room_identifier$ = this.route.params
		.pipe(map(p => p.chat_room_identifier))
		.pipe(distinctUntilChanged())
		.pipe(shareReplay(1));

	public constructor(
		public route: ActivatedRoute,
	) {}

}
