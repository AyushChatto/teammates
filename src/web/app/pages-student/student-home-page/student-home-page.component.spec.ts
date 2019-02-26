import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentHomePageComponent } from './student-home-page.component';

import { ResponseStatusPipe } from '../../pipes/session-response-status.pipe';
import { SubmissionStatusPipe } from '../../pipes/session-submission-status.pipe';

describe('StudentHomePageComponent', () => {
  let component: StudentHomePageComponent;
  let fixture: ComponentFixture<StudentHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentHomePageComponent,
        ResponseStatusPipe,
        SubmissionStatusPipe,
      ],
      imports: [
        HttpClientTestingModule,
        NgbModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should snap with null fields', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should snap with no feedback sessions', () => {
    const studentName: string = '';
    const studentCourse: any = {
      course: {
        id: 'CS3281',
        name: 'Thematic Systems',
      },
      feedbackSessions: [],
    };
    component.user = studentName;
    component.courses = [studentCourse];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should snap with two feedback sessions for one course', () => {
    const studentName: string = 'John Doe';
    const studentCourse: any = {
      course: {
        id: 'CS2103',
        name: 'Software Engineering',
      },
      feedbackSessions: [
        {
          feedbackSession: {
            feedbackSessionName: 'First Session',
            courseId: 'CS2103',
          },
        },
        {
          feedbackSession: {
            feedbackSessionName: 'Second Session',
            courseId: 'CS2103',
          },
        },
      ],
    };
    const sessionInfoMap: any = {
      endTime: '1200',
      isOpened: true,
      isWaitingToOpen: true,
      isPublished: true,
      isSubmitted: true,
    };

    component.user = studentName;
    component.courses = [studentCourse];
    component.sessionsInfoMap = {
      'CS2103%First Session': sessionInfoMap,
      'CS2103%Second Session': sessionInfoMap,
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
