import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-core';

import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Store } from '@ngrx/store';
// const user: User = {
//     name: 'name',
//     firstName: 'firstName',
//     email: 'email@test.fr',
//     password: 'password'
// }
// const currentUser$ = cold('-x|', { a: user });


// describe('ProfileComponent', () => {
//   let component: ProfileComponent;
//   let fixture: ComponentFixture<ProfileComponent>;
  
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ProfileComponent ],
//       providers:[
//           {
//               provide: Store,
//               useValue: user
//           }
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//});
