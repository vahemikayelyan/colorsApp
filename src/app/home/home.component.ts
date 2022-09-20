import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = ['position', 'name', 'rgb', 'symbol', 'color'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  colorName: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (
      data: PeriodicElement,
      filter: string
    ) => {
      let matchFound = false;

      if (data.name) {
        matchFound = data.name.trim().toLowerCase().includes(filter);
      }

      return matchFound;
    };
  }

  clearColorName() {
    this.colorName = '';
    this.searchColor();
  }

  searchColor() {
    this.dataSource.filter = this.colorName.toLowerCase().trim();
  }

  printPage() {
    this.sharedService.printPage('brown');
  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  rgb: number;
  symbol: string;
  color: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', rgb: 1.0079, symbol: 'H', color: '' },
  { position: 2, name: 'Helium', rgb: 4.0026, symbol: 'He', color: '' },
  { position: 3, name: 'Lithium', rgb: 6.941, symbol: 'Li', color: '' },
  { position: 4, name: 'Beryllium', rgb: 9.0122, symbol: 'Be', color: '' },
  { position: 5, name: 'Boron', rgb: 10.811, symbol: 'B', color: '' },
  { position: 6, name: 'Carbon', rgb: 12.0107, symbol: 'C', color: '' },
  { position: 7, name: 'Nitrogen', rgb: 14.0067, symbol: 'N', color: '' },
  { position: 8, name: 'Oxygen', rgb: 15.9994, symbol: 'O', color: '' },
  { position: 9, name: 'Fluorine', rgb: 18.9984, symbol: 'F', color: '' },
  { position: 10, name: 'Neon', rgb: 20.1797, symbol: 'Ne', color: '' },
  { position: 11, name: 'Sodium', rgb: 22.9897, symbol: 'Na', color: '' },
  { position: 12, name: 'Magnesium', rgb: 24.305, symbol: 'Mg', color: '' },
  { position: 13, name: 'Aluminum', rgb: 26.9815, symbol: 'Al', color: '' },
  { position: 14, name: 'Silicon', rgb: 28.0855, symbol: 'Si', color: '' },
  { position: 15, name: 'Phosphorus', rgb: 30.9738, symbol: 'P', color: '' },
  { position: 16, name: 'Sulfur', rgb: 32.065, symbol: 'S', color: '' },
  { position: 17, name: 'Chlorine', rgb: 35.453, symbol: 'Cl', color: '' },
  { position: 18, name: 'Argon', rgb: 39.948, symbol: 'Ar', color: '' },
  { position: 19, name: 'Potassium', rgb: 39.0983, symbol: 'K', color: '' },
  { position: 20, name: 'Calcium', rgb: 40.078, symbol: 'Ca', color: '' },
];
