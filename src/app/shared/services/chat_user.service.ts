import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

export interface ChatUser {
    username: string;
    photo_url?: string;
    moderator?: boolean;
}

@Injectable()
export class ChatUserService {

    /**
     * Observable for the active user identity in chat
     */
    public readonly user$ = new BehaviorSubject<ChatUser | null>(environment.user);

}
