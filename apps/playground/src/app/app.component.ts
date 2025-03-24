import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BreadcrumbBarComponent } from './components/breadcrumb-bar';
import { SidenavComponent } from './components/sidenav';

@Component({
  imports: [BreadcrumbBarComponent, RouterOutlet, SidenavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
