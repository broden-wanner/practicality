import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messages = new Subject<any>();

  constructor() {}

  /**
   * Returns an observable of the messages to the toast component
   */
  public getMessages(): Observable<any> {
    return this.messages.asObservable();
  }

  /**
   * Public method to be used by components to send messages to the toast
   * @param message - message to show
   * @param color - color to to show
   */
  public sendMessage(message: string, color: string, duration?: number): void {
    this.messages.next({ message, color, duration });
  }
}
