import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tenants } from '../tenants';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tenant-form',
  styleUrl: './tenant-form.css',
  templateUrl: './tenant-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantForm implements OnInit{

}
