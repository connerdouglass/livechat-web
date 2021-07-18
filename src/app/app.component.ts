import { Component, OnDestroy, OnInit } from '@angular/core';
import { TelegramAuthService } from './shared/services/telegram_auth.service';

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
			this.telegram_auth_service.storeUser(data.user);
		}
	};

	public constructor(
		private telegram_auth_service: TelegramAuthService,
	) {}

	public ngOnInit(): void {
		window.addEventListener('message', this.message_handler);
	}

	public ngOnDestroy(): void {
		window.removeEventListener('message', this.message_handler);
	}

}
