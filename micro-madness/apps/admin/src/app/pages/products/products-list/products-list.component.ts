import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService, Product } from '@micro-madness/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy{
    products: Product[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
      private productsService: ProductsService, 
      private router: Router, 
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    ngOnDestroy(): void {
      this.endsubs$.next();
      this.endsubs$.complete();
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the Product??',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._deleteProduct(productId);
            },
            reject: () => {}
        });
    }

    getProducts() {
        this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe((prods) => {
            console.log(prods);
            this.products = prods;
        });
    }

    private _deleteProduct(productId: string) {
      this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
        this.messageService.add(
          {
            severity:'success', 
            summary:'Success', 
            detail:'Product Deleted Successfully'
          }
        );
        this.getProducts();
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
