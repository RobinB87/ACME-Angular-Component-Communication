import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnChanges, AfterViewInit {
  listFilter: string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;

  // Can also use ViewChildren. This returns a QueryList
  // Eg: use @ViewChild(NgModel) and it references all NgModel in the template
  @ViewChild("filterElement") filterElementRef: ElementRef;

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
