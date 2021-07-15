import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { map, shareReplay, switchMap, take } from "rxjs/operators";
import SocketIOClient from 'socket.io-client';
import { User } from "../components/telegram-login-button/telegram-login-button.component";
import { SiteConfigService } from "./site_config.service";

@Injectable({
    providedIn: 'root',
})
export class SocketService {

    /**
     * The socket connection to the API
     */
    private socket$ = this.site_config_service.site_config$
        .pipe(map(config => SocketIOClient(config.api_baseurl)))
        .pipe(shareReplay(1));

    public constructor(
        private site_config_service: SiteConfigService,
    ) {}

    private async use_socket(fn: (socket: SocketIOClient.Socket) => void): Promise<void> {
        const socket = await this.socket$
            .pipe(take(1))
            .toPromise();
        fn(socket);
    }

    public join_stream(chat_room_identifier: string): void {
        this.use_socket(socket => {
            socket.emit('chatroom.join', {
                chat_room_identifier,
            });
        });
    }

    public send_message(chat_room_identifier: string, message: string, user: User): void {
        this.use_socket(socket => {
            socket.emit('chatroom.message', {
                chat_room_identifier,
                message: encodeURIComponent(message),
                user: {
                    username: user.username ? encodeURIComponent(user.username) : undefined,
                    photo_url: user.photo_url,
                },
            });
        });
    }

    public event$<T = any>(event: string): Observable<T> {
        return this.socket$
            .pipe(switchMap(socket => fromEvent<T>(socket, event)));
    }

}