import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

@Injectable()
export class StudioService {

    public constructor(
        private auth_service: AuthService,
        private api_service: ApiService,
    ) {}

    public async mute_chat_username(/* creator_id: number,*/ username: string): Promise<void> {
        await this.api_service.fetch('/v1/studio/chat/mute', {
            // creator_id,
            username,
        });
    }

    public async unmute_chat_username(/* creator_id: number,*/ username: string): Promise<void> {
        await this.api_service.fetch('/v1/studio/chat/unmute', {
            // creator_id,
            username,
        });
    }

}