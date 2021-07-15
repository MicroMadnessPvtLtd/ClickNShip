import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@micro-madness/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  categoryForm!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId = '';
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.CategoryForm.name.value,
      icon: this.CategoryForm.icon.value,
      color: this.CategoryForm.color.value
    }
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._createCategory(category);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.CategoryForm.name.setValue(category.name);
          this.CategoryForm.icon.setValue(category.icon);
          this.CategoryForm.color.setValue(category.color);
        });
      }
    })
  }

  private _createCategory(category: Category) {
    this.categoriesService.createCategory(category).pipe(takeUntil(this.endsubs$)).subscribe(
      (category: Category) => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:`Category ${category.name} Saved Successfully`
        }
      );
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add(
        {
          severity:'error', 
          summary:'Error', 
          detail:'Something happened wrong. Please try again. If the issue remains, please contact support.'
        }
      );
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).pipe(takeUntil(this.endsubs$)).subscribe(
      (category: Category) => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:`Category ${category.name} Updated Successfully`
        }
      );
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add(
        {
          severity:'error', 
          summary:'Error', 
          detail:'Something happened wrong. Please try again. If the issue remains, please contact support.'
        }
      );
    });
  }

  get CategoryForm() {
    return this.categoryForm.controls;
  }

}
