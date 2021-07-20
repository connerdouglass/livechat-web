import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatUserService } from './shared/services/chat_user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private message_handler = (event: MessageEvent<any>) => {
		const data = event.data;
		if (!data || typeof data !== 'object') return;
		if (data.type === 'auth') {
			this.chat_user_service.user$.next(data.user);
		}
	};

	public constructor(
		private chat_user_service: ChatUserService,
	) {}

	public ngOnInit(): void {
		window.addEventListener('message', this.message_handler);
	}

	public ngOnDestroy(): void {
		window.removeEventListener('message', this.message_handler);
	}

}
