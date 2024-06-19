import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Product} from "../dto/product";
import {ProductCommand} from "../dto/productcommand";


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private endpoint: string = environment.apiUrl + "/products";

    constructor(private http: HttpClient) { }

    public getProducts = () => {
        return this.http.get<Product[]>(this.endpoint);
    };

    public deleteProduct = (id: string) => {
        return this.http.delete((`${this.endpoint}/${id}`));
    };

    addProduct = (productCommand: ProductCommand) => {
        return this.http.post<any>(`${this.endpoint}`, productCommand);
    }
}
