import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, Product, ProductsService } from '@micro-madness/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editMode = false;
  productForm!: FormGroup;
  isSubmitted = false;
  categories: any[] = [];
  imageDisplay: any;
  currentProductId = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private location: Location,
    private messageService: MessageService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.ProductForm).map((key) => {
      productFormData.append(key, this.ProductForm[key].value);
    })
    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._saveProduct(productFormData);
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({image: file});
      this.productForm.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
        console.log(this.imageDisplay);
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })

    this._checkEditMode();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  private _checkEditMode(): void {

    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe(product => {
          console.log(product);
          this.ProductForm.name.setValue(product.name);
          this.ProductForm.brand.setValue(product.brand);
          this.ProductForm.price.setValue(product.price);
          this.ProductForm.countInStock.setValue(product.countInStock);
          this.ProductForm.category.setValue(product.category?.id);
          this.ProductForm.isFeatured.setValue(product.isFeatured);
          this.ProductForm.description.setValue(product.description);
          this.ProductForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.ProductForm.image.setValidators([]);
          this.ProductForm.image.updateValueAndValidity();
        });
      }
    })
    
  }

  private _saveProduct(productFormData: FormData) {
    this.productsService.createProduct(productFormData).subscribe(
      (product: Product) => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:`Product - ${product.name} Saved Successfully`
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

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      (product: Product) => {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:`Product - ${product.name} Updated Successfully`
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

  get ProductForm() {
    return this.productForm.controls;
  }

}
