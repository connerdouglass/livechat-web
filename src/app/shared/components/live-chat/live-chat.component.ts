import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { merge, ReplaySubject, Subject } from "rxjs";
import { map, scan, shareReplay, take, takeUntil, tap } from "rxjs/operators";
import { AppStateService } from "../../services/app_state.service";
import { ChatUser, ChatUserService } from "../../services/chat_user.service";
import { SocketService } from "../../services/socket.service";

interface IMessage {
    id: string;
    username: string;
    photo_url?: string;
    message: string;
}

type MessagesUpdate =
    | { type: 'add'; ms: IMessage[]; }
    | { type: 'revoke'; id: string; };

@Component({
    selector: 'app-live-chat',
    styleUrls: ['./live-chat.component.scss'],
    templateUrl: './live-chat.component.html',
})
export class LiveChat implements OnInit, OnDestroy {

    public readonly icons = {
        user_avatar: faUser,
        send: faArrowRight,
    };

    /**
     * The chatroom identifier whose chat should be presented here
     */
    @Input('chatroom') public set chatroom_identifier(id: string) {
        this.chatroom_identifier$.next(id);
    }

    /**
     * Subject for the identifier of the chatroom
     */
    private chatroom_identifier$ = new ReplaySubject<string>(1);

    /**
     * The scroll box containing all the messages
     */
    @ViewChild('messages_scrollbox', { static: true }) public messages_scrollbox?: ElementRef<HTMLDivElement>;

    /**
     * The value of the text field
     */
    public field_value = '';

    /**
     * Observable to the messages on the live chat
     */
    public messages$ = merge(
            this.socket_service.event$('chat.messages').pipe(map(ms => (<MessagesUpdate>{ type: 'add', ms }))),
            this.socket_service.event$('chat.revoke-message').pipe(map(data => (<MessagesUpdate>{ type: 'revoke', id: data.id }))),
        )
        .pipe(scan((msgs: IMessage[], update: MessagesUpdate) => {
            if (update.type === 'add') {
                const new_msgs = [
                    ...msgs,
                    ...update.ms.map(m => ({
                        ...m,
                        username: decodeURIComponent(m.username),
                        message: decodeURIComponent(m.message),
                    })),
                ];
                while (new_msgs.length > 100) new_msgs.shift();
                return new_msgs;
            } else if (update.type === 'revoke') {
                return msgs.filter(m => m.id !== update.id);
            }
            return msgs;
        }, []))
        .pipe(tap(() => {
            setTimeout(() => {
                console.log('Scrolling down');
                this.adjust_scroll();
            }, 0);
        }))
        .pipe(shareReplay(1));

    /**
     * Subject emitted when the component is destroyed
     */
    private destroyed$ = new Subject<void>();

    public constructor(
        private socket_service: SocketService,
        public app_state_service: AppStateService,
        public chat_user_service: ChatUserService,
    ) {}

    /**
     * Called when the component is initialized
     */
    public ngOnInit(): void {
        this.chatroom_identifier$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(chatroom_identifier => {
                this.socket_service.join_stream(chatroom_identifier);
            });
    }

    /**
     * Called when the component is destroyed
     */
    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Checks if the live chat is locked to the bottom
     */
    private is_bottom_locked(): boolean {
        if (!this.messages_scrollbox || !this.messages_scrollbox.nativeElement) return true;
        const box = this.messages_scrollbox.nativeElement;
        const dist = (box.scrollHeight - box.getBoundingClientRect().height) - box.scrollTop;
        return dist < 40;
    }

    /**
     * Scrolls the live chat box to the bottom
     */
    private scroll_to_bottom(): void {
        if (!this.messages_scrollbox || !this.messages_scrollbox.nativeElement) return;
        const box = this.messages_scrollbox.nativeElement;
        box.scrollTop = box.scrollHeight;
    }

    /**
     * Adjusts the scrolling of the viewport when a new message is received
     */
    private adjust_scroll(): void {

        // If we're locked to the bottom
        /* if (this.is_bottom_locked()) */ this.scroll_to_bottom();

    }

    public async clicked_send(user: ChatUser) {

        // If the field value is empty
        if (this.field_value.trim().length === 0 || this.field_value.trim().length > 280) return;

        // Get the chatroom identifier
        const chatroom_identifier = await this.chatroom_identifier$
            .pipe(take(1))
            .toPromise();

        // Send the message
        this.socket_service.send_message(
            chatroom_identifier,
            this.field_value.trim(),
            user,
        );

        // Clear the field value
        this.field_value = '';

    }

    public async revoke_message(msg: IMessage) {

        // Get the chatroom identifier
        const chatroom_identifier = await this.chatroom_identifier$
            .pipe(take(1))
            .toPromise();

        // Send the message
        this.socket_service.revoke_message(
            chatroom_identifier,
            msg.id,
        );

    }

}
