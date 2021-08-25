import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnChanges, AfterViewInit {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  // Can also use ViewChildren. This returns a QueryList
  // Eg: use @ViewChild(NgModel) and it references all NgModel in the template
  @ViewChild("filterElement") filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  // Considerations:
  // This directly accesses the DOM (tightly coupled to the browser)
  // Can pose a security threat (eg when accessing innerHtml)
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    if (this.filterElementRef) this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hitCount"] && !changes["hitCount"].currentValue) {
      this.hitMessage = "No matches found";
    } else {
      this.hitMessage = "Hits: " + this.hitCount;
    }
  }
}
