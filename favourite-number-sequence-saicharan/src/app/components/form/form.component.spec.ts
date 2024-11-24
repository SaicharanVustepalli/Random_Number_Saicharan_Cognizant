import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interval } from 'rxjs';
import { FormComponent } from './form.component';
import { RandomNumberService } from '../../services/random-number.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let randomNumberService: jasmine.SpyObj<RandomNumberService>;

  beforeEach(async () => {
    const randomNumberServiceSpy = jasmine.createSpyObj('RandomNumberService', ['generateNumber']);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [{ provide: RandomNumberService, useValue: randomNumberServiceSpy }],
    }).compileComponents();

    randomNumberService = TestBed.inject(RandomNumberService) as jasmine.SpyObj<RandomNumberService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    randomNumberService.generateNumber.calls.reset();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Favourite Number Sequence Saicharan'`, () => {
    const fixture = TestBed.createComponent(FormComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Favourite Number Sequence Saicharan');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if fields are missing', () => {
    component.randomNumberForm.setValue({ favouriteNumber: null, length: null });
    expect(component.randomNumberForm.valid).toBeFalse();
  });

  it('should call generateNumber on the service and update generatedNumber', () => {
    const mockGeneratedNumber = '1234';
    randomNumberService.generateNumber.and.returnValue(mockGeneratedNumber);

    component.generateRandomNumber(5, 4);

    expect(randomNumberService.generateNumber).toHaveBeenCalledWith(5, 4);
    expect(component.generatedNumber).toBe(mockGeneratedNumber);
  });

  it('should unsubscribe from the interval on destroy', () => {
    component['intervalSubscription'] = interval(5000).subscribe(); // Simulate subscription
    const unsubscribeSpy = spyOn(component['intervalSubscription'], 'unsubscribe'); // Spy on unsubscribe
    component.ngOnDestroy(); // Trigger destroy lifecycle
    expect(unsubscribeSpy).toHaveBeenCalled(); // Ensure unsubscribe is called
  });
});


