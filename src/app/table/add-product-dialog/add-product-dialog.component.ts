import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ProductService} from "../../shared/services/product.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductCommand} from "../../shared/dto/productcommand";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-add-product-dialog',
    standalone: true,
    imports: [
        MatFormField,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatButton,
        MatInput,
        FormsModule,
        HttpClientModule,
        MatError,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './add-product-dialog.component.html',
    styleUrl: './add-product-dialog.component.css',
    providers: [ProductService],
})
export class AddProductDialogComponent {

    productForm!: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
                private readonly productService: ProductService,
                private readonly fb: FormBuilder,) {
        this.productForm = this.fb.group({
            productName: ['', Validators.required],
            productPrice: ['', [Validators.required, Validators.min(0.01)]]
        });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    addProduct() {
        const productData = this.productForm.value;
        const product: ProductCommand = {
            name: productData.productName,
            price: productData.productPrice
        };

        this.productService.addProduct(product).subscribe(
            () => {
                this.dialogRef.close();
            },
            error => {
                console.error('Error adding product:', error);
            }
        );
    }
}
