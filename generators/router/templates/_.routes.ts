import { RouterConfig } from '@angular/router';

import { <%= name %>Component } from './<%= name %>.component';

export const <%= name %>Routes: RouterConfig = [
  {
    path: '<%= name %>',
    component: <%= name %>Component
  }
];
