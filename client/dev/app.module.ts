import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { FormsModule, 
          FormBuilder }         from '@angular/forms';
import { BrowserModule  }       from '@angular/platform-browser';

import { SharedModule }         from './shared/shared.module';
import { ReportModule }         from './report/report.module';
import { ImportModule }         from './import/import.module';
import { PeopleModule }         from './people/people.module';
import { UserModule }           from './user/user.module';
import { EventModule }           from './event/event.module';
import { LoginModule }           from './login/login.module';

import { TodoCmp }              from './todo/components/todo-cmp';

import { HomeComponent }        from './home/components/home.component';
import { Myheader }             from './myheader/components/myheader';
import { Footer }               from './myfooter/components/footer';
import { Sidebar }              from './mysidebar/components/sidebar';
import { Notfound }             from './notfound/components/notfound';

import { TodoService }          from './todo/services/todo-service';


import { reportRouting }        from './report/report.routing';
import { importRouting }        from './import/import.routing';
import { peopleRouting }        from './people/people.routing';
import { userRouting }          from './user/user.routing';
import { eventRouting }         from './event/event.routing';
import { loginRouting }         from './login/login.routing';


import { routing }              from './app.routing';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      SharedModule,
      ImportModule,
      ReportModule,
      PeopleModule,
      UserModule,
      EventModule,
      LoginModule,
      importRouting,
      reportRouting,
      peopleRouting,
      userRouting,
      eventRouting,
      loginRouting,
      routing
    ],
   declarations: [
      TodoCmp,
      Myheader,
      Sidebar,
      Footer,
      HomeComponent,
      Notfound
    ],
    providers: [
      TodoService,
    ],
    bootstrap: [ TodoCmp ],
})
export class AppModule {}
