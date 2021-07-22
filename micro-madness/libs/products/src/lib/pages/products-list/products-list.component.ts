import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@micro-madness/products';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  binary = true;
  isCategoryPage = false;

  constructor(
    private productsService: ProductsService, 
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._checkRoute();
    if (!this.isCategoryPage) {
      this._getCategories();
    }
  }

  filterCategory() {
    const selectedCategories = this.categories.filter(c => c.checked === true).map(c => c.id);
    this._getProducts(selectedCategories);
    console.log(selectedCategories);
  }

  private _getProducts(selectedCategories?: string[]): void {
    this.productsService.getProducts(selectedCategories).subscribe((products) => {
      console.log(products);
      this.products = products;
    }, (err) => {
      console.log(err);
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    }, (err) => {
      console.log(err);
    })
  }

  private _checkRoute() {
    this.route.params.subscribe((params) => {
      if (params.categoryid) {
        this.isCategoryPage = true;
      }
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
    })
  }

}
