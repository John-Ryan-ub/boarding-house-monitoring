import { Component, OnInit, inject, output, signal, computed } from '@angular/core';
import { Tenants } from '../tenants';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-tenant-list',
  styleUrl: './tenant-list.css',
  templateUrl: './tenant-list.html',
})
export class TenantList implements OnInit{
  tenantService = inject(Tenants);

  router = inject(Router);

  editTenant(tenant: any): void {
  console.log('Editing Tenant:', tenant._id);
  this.router.navigate(['/tenant',tenant._id,'edit']);
  }

  editRequested = output<any>();

  selectedFloor = signal<'All' | '1st Floor' | '2nd Floor' | '3rd Floor'>('All');

  filteredTenant = computed(() => {
    const tenant = this.tenantService.tenantList();
    const floor = this.selectedFloor();

    return floor === 'All'
      ? tenant
      : tenant.filter(tenant => tenant.floor === floor);
  });

  setFloor(floor: 'All' | '1st Floor' | '2nd Floor' | '3rd Floor'): void {
    this.selectedFloor.set(floor);
  }

  ngOnInit(): void {
    this.tenantService.fetchTenant();
  }

  deleteLeaders(id: string): void {
    if (confirm('Are you sure you want to delete this Gym Leader?')) {
      this.tenantService.deleteTenant(id);
    }
  }
}
