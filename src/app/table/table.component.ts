import {Component, OnInit} from '@angular/core';
import {ProductDataSource} from "../shared/product.datasource";
import {ProductService} from "../shared/services/product.service";
import {CommonModule} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from "@angular/material/button";
import {AddProductDialogComponent} from "./add-product-dialog/add-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    imports: [CommonModule, MatTableModule, MatIconModule, MatButton, AddProductDialogComponent],
    standalone: true,
})
export class TableComponent implements OnInit {
    displayedColumns = ['id', 'name', 'price', 'delete'];
    productDataSource!: ProductDataSource;

    constructor(private readonly productService: ProductService,
                private readonly dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.productDataSource = new ProductDataSource(this.productService);
        this.productDataSource.loadProducts();
    }

    deleteProduct(id: string) {
        this.productDataSource.deleteProduct(id);
    }

    openAddProductDialog() {
        const dialogRef = this.dialog.open(AddProductDialogComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(() => {
            this.productDataSource.loadProducts()
            console.log('The dialog was closed');
        });
    }
}

