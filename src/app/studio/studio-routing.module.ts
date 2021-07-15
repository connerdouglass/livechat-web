import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from '../shared/guards/auth-required.guard';
import { UnauthRequiredGuard } from '../shared/guards/unauth-required.guard';
import { DashChatComponent } from './dashboard/chat/chat.component';
import { StudioDashboardComponent } from './dashboard/dashboard.component';
import { StudioLoginPageComponent } from './login/login.component';

const routes: Routes = [
	{
		path: 'login',
		component: StudioLoginPageComponent,
		canActivate: [UnauthRequiredGuard],
		data: {
			auth_redirect: '/studio/streams',
		},
	},
	{
		path: '',
		component: StudioDashboardComponent,
		canActivate: [AuthRequiredGuard],
		canActivateChild: [AuthRequiredGuard],
		data: {
			auth_redirect: '/studio/login',
		},
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/studio/streams',
			},
			{
				path: 'chat',
				component: DashChatComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StudioRoutingModule {}
