import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TenantForm } from './tenant-form/tenant-form';
import { TenantList } from './tenant-list/tenant-list';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'tenantform', component: TenantForm },
  { path: 'tenant/:id/edit', component: TenantForm },
  { path: 'tenantlist', component: TenantList },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];