import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'chatroom',
		loadChildren: () => import('./chatroom/chatroom.module').then(m => m.ChatRoomModule),
	},
	{
		path: 'studio',
		loadChildren: () => import('./studio/studio.module').then(m => m.StudioModule),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/studio',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
