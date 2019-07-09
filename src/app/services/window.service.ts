import { Injectable } from '@angular/core';
declare var window: any;

function _window() : any {
  return window;
}

@Injectable()
export class WindowRef {
  nativeWindow(): any {
    return _window();
  }
}
