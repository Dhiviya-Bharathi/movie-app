import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FormsModule } from '@angular/forms';
import { ReadMoreComponent } from './read-more/read-more.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ResultsComponent,
    ListItemComponent,
    ReadMoreComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
