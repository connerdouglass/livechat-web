import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { TelegramAuthService } from '../shared/services/telegram_auth.service';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {

	public chat_room_identifier$ = this.route.params
		.pipe(map(p => p.chat_room_identifier))
		.pipe(distinctUntilChanged())
		.pipe(shareReplay(1));

	private message_handler = (event: MessageEvent<any>) => {
		const data = event.data;
		if (!data || typeof data !== 'object') return;
		if (data.type === 'auth') {
			this.telegram_auth_service.storeUser(data.user);
		}
	};

	public constructor(
		public route: ActivatedRoute,
		private telegram_auth_service: TelegramAuthService,
	) {}

	public ngOnInit(): void {
		window.addEventListener('message', this.message_handler);
	}

	public ngOnDestroy(): void {
		window.removeEventListener('message', this.message_handler);
	}

}
