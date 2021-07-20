import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LiveChat } from './components/live-chat/live-chat.component';
import { StudioLoginForm } from './components/studio-login-form/studio-login-form.component';
import { AdminRequiredGuard } from './guards/admin-required.guard';
import { AuthRequiredGuard } from './guards/auth-required.guard';
import { UnauthRequiredGuard } from './guards/unauth-required.guard';
import { ApiService } from './services/api.service';
import { AppStateService } from './services/app_state.service';
import { AuthService } from './services/auth.service';
import { AuthTokenService } from './services/auth_token.service';
import { ChatUserService } from './services/chat_user.service';
import { SiteConfigService } from './services/site_config.service';
import { SocketService } from './services/socket.service';
import { StudioService } from './services/studio.service';

@NgModule({
	declarations: [
		LiveChat,
		StudioLoginForm,
	],
	imports: [
		CommonModule,
		FormsModule,
		FontAwesomeModule,
		MatInputModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	exports: [
		LiveChat,
		StudioLoginForm,
	],
})
export class SharedModule {
	public static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [
				ApiService,
				AppStateService,
				AuthTokenService,
				AuthService,
				SiteConfigService,
				SocketService,
				StudioService,
				ChatUserService,
                AdminRequiredGuard,
                AuthRequiredGuard,
                UnauthRequiredGuard,
			],
		};
	}
}
