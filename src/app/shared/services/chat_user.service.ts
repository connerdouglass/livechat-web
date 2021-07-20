import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ChatUser {
    username: string;
    photo_url?: string;
}

@Injectable()
export class ChatUserService {

    /**
     * Observable for the active user identity in chat
     */
    public readonly user$ = new BehaviorSubject<ChatUser | null>(null);

}
