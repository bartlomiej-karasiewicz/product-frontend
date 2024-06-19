import {BehaviorSubject, Observable, of} from "rxjs";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, finalize} from "rxjs/operators";
import {Product} from "./dto/product";
import {ProductService} from "./services/product.service";
import {ProductCommand} from "./dto/productcommand";

export class ProductDataSource implements DataSource<Product> {

    private productSubject = new BehaviorSubject<Product[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private productService: ProductService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Product[]> {
        return this.productSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productSubject.complete();
        this.loadingSubject.complete();
    }

    addProduct(productCommand: ProductCommand): Observable<any> {
        this.loadingSubject.next(true);
        return this.productService.addProduct(productCommand)
            .pipe(
                finalize(() => this.loadingSubject.next(false)),
                catchError(error => {
                    console.error('Error adding product', error);
                    return of(null);
                })
            );
    }

    loadProducts() {
        this.loadingSubject.next(true);
        this.productService.getProducts()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: Product[]) => {
                    this.productSubject.next(result);
                }
            );
    }

    deleteProduct(id: string) {
        this.productService.deleteProduct(id).subscribe(() => {
            this.loadProducts();
        }, error => {
            console.error('Error deleting product', error);
        });
    }

}
