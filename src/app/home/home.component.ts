import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../services/shared.service';
import { read, WorkBook, utils } from 'xlsx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayedColumns: string[] = ['position', 'name', 'rgb', 'symbol', 'color'];
  dataSource = new MatTableDataSource<ColorElement>();
  excelSubscription?: Subscription;
  colorName: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.readExcelSheet();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: ColorElement, filter: string) => {
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

  printPage(color: string) {
    this.sharedService.printPage(color);
  }

  readExcelSheet() {
    this.excelSubscription = this.sharedService
      .getExcelSheet()
      .subscribe((data) => {
        const fileReader: FileReader = new FileReader();

        fileReader.readAsBinaryString(data);
        fileReader.onloadend = (e) => {
          const binaryData = e.target?.result;
          const workBook: WorkBook = read(binaryData, { type: 'binary' });
          let tableData: ColorElement[] = [];
          let position: number = 0;

          workBook.SheetNames.forEach((seetName) => {
            const sheetData: ColorElement[] = utils.sheet_to_json(
              workBook.Sheets[seetName]
            );
            sheetData.forEach((row) => {
              position++;
              tableData.push({ ...row, position });
            });
          });

          this.dataSource.data = tableData;
        };
      });
  }

  ngOnDestroy() {
    if (this.excelSubscription) {
      this.excelSubscription.unsubscribe();
    }
  }
}

export interface ColorElement {
  position?: number;
  name?: string;
  rgb?: number;
  hex?: string;
}
