import { Component, OnInit, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tenants } from '../tenants';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit{
  tenantService = inject(Tenants);
  totalRoomCapacity = 20;

  totalTenants = computed(() => {
    return this.tenantService.tenantList().length;
  });

  occupiedRooms = computed(() => {
    const tenants = this.tenantService.tenantList();

    const rooms = tenants
      .map(tenant => tenant.moveRoom)
      .filter(room => room);

    return new Set(rooms).size;
  });

  availableRooms = computed(() => {
    return Math.max(0, this.totalRoomCapacity - this.occupiedRooms());
  });

  monthlyIncome = computed(() => {
    const tenants = this.tenantService.tenantList();

    return tenants.reduce((total, tenant) => {
      return total + Number(tenant.monthlyRent || 0);
    }, 0);
  });

  ngOnInit(): void {
    this.tenantService.fetchTenant();
  }
}
