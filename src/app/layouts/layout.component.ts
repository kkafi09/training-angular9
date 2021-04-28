import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { MessagingService } from '../core/services/messaging.service';
import { LAYOUT_VERTICAL, LAYOUT_HORIZONTAL } from './layouts.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // layout related config
  layoutType: string;
  message: any;
  constructor(
    private eventService: EventService,
    private messagingService: MessagingService,
  ) {}

  ngOnInit() {
    // default settings
    this.layoutType = LAYOUT_HORIZONTAL;

    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  ngAfterViewInit() {}

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }
}
