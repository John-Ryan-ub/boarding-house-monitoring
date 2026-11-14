import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Tenants {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:300/api/tenant';

    tenantList = signal<any[]>([]);

    firstFloor = computed(() =>
        this.tenantList().filter(tenant => tenant.room === '1st Floor').length
    );

    secondFloor = computed(() =>
        this.tenantList().filter(tenant => tenant.room === '2nd Floor').length
    );

    thirdFloor = computed(() =>
        this.tenantList().filter(tenant => tenant.room === '3rd Floor').length
    );

    fetchTenant() {
        this.http.get<any[]>(this.apiUrl).subscribe({
        next: (data) => this.tenantList.set(data),
        error: (err) => console.error('Failed to fetch Tenant:', err)
        });
    }

    getTenant(id: string): Observable<Tenants> {
        return this.http.get<Tenants>(`${this.apiUrl}/${id}`);
    }

    saveTenant(data: any) {
        return this.http.post<any>(this.apiUrl, data);
    } 
    
    deleteTenant(id: string){
        return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.tenantList.update(list => list.filter(p => p._id !== id)));
    }

    updateTenant(id: string, data: any) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, data);
    } 
}
