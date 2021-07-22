import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService, Category } from '@micro-madness/products';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the Category??',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._deleteCategory(categoryId);
        },
        reject: () => {
        }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }

  private _deleteCategory(categoryId: string) {
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:'Category Deleted Successfully'
        }
      );
      this.getCategories();
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

}
