import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tenants } from '../tenants';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-tenant-form',
  styleUrl: './tenant-form.css',
  templateUrl: './tenant-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantForm implements OnInit{
  private formBuilder = inject(FormBuilder);
  tenantService = inject(Tenants);
  editingId = signal<string | null>(null);

  tenantForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.min(2)]],
    contactNumber: ['', Validators.required],
    email: ['', Validators.required],
    monthlyRent: ['', Validators.required],
    moveInDate: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    status: ['', [Validators.required, Validators.maxLength(150)]],
  });

  ngOnInit() {
    this.tenantService.fetchTenant();
  }

  startEdit(Tenant: any){
    this.editingId.set(Tenant._id);
    this.tenantForm.patchValue(Tenant);
  }

  cancelEdit(){
    this.editingId.set(null);
    this.tenantForm.reset();
  }

  onSubmit() {
    if (this.tenantForm.invalid) return;

    const data = this.tenantForm.getRawValue();
    const id = this.editingId();

    if(id){
      this.tenantService.updateTenant(id, data).subscribe({
        next: () => {
          this.tenantService.fetchTenant();
          this.cancelEdit();
        }, 
        error: (err) => console.error('Update Failed!', err)
      })
    } else {
      this.tenantService.saveTenant(data).subscribe({
      next: () => {
        this.tenantService.fetchTenant();
        this.tenantForm.reset();
      },
      error: (err) => console.error('Save failed', err)
      });
    }
  }
}
