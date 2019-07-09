import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class GrowlService {
  messages = [];

  addSingle(message) {
    this.messages.push(message);
    this.refreshMessages();

    if(message.timeout) {
      this.clear(message.timeout);
    } else {
      this.clear();
    }
  }

  addMultiple() {}

  clear(timeout = 2000) {
    setTimeout(() => {
      this.messages = [];
      this.refreshMessages();
    },timeout);
  }

  refreshMessages() {
    if(this.messages.length > 0) {
      var html = '';
      this.messages.forEach((data) => {

        var message;
        if(data.type == 'warning'){
          html += '<div style="padding: 10px;" class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>' + data.header + '</strong> ' + data.message + '<button aria-label="Close" class="close" data-dismiss="alert" type="button"> <span aria-hidden="true" style="position:  absolute;top: -1px;right: -15px;">×</span></button> </div>';
        }
        if(data.type == 'danger') {
          html += '<div style="padding: 10px;" class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>' + data.header + '</strong> ' + data.message + '<button aria-label="Close" class="close" data-dismiss="alert" type="button"> <span aria-hidden="true" style="position:  absolute;top: -1px;right: -15px;">×</span></button> </div>';
        }
        if(data.type == 'success'){
          html += '<div style="padding: 10px;" class="alert alert-success alert-dismissible fade show" role="alert"> <strong>' + data.header + '</strong> ' + data.message + '<button aria-label="Close" class="close" data-dismiss="alert" type="button"> <span aria-hidden="true" style="position:  absolute;top: -1px;right: -15px;">×</span></button> </div>';
        }
      });
      $('.notification-box').html(html);
    } else {
      $('.notification-box').html('<span></span>');
    }

  }

}
