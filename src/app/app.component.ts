import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TableComponent} from "./table/table.component";
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./shared/services/product.service";
import {AddProductDialogComponent} from "./table/add-product-dialog/add-product-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, HttpClientModule, AddProductDialogComponent],
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-frontend';
}
