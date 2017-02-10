import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent                // the root component needs to be declared
    ],
    imports: [
        BrowserModule
    ],
    bootstrap: [AppComponent]     // we bootstrap on the root component
})
export class AppModule {}
