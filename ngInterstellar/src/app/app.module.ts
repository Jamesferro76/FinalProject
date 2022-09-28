import { NavigationComponent } from './components/navigation/navigation.component';
import { UserService } from './services/user.service';
import { MixerService } from './services/mixer.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MixerComponent } from './components/mixer/mixer.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatComponent } from './components/chat/chat.component';
import { InterChatComponent } from './components/inter-chat/inter-chat.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './components/search/search.component';
import { ContactComponent } from './components/contact/contact.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ActivePipe } from './pipes/active.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MixerComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    NavigationComponent,
    ChatComponent,
    InterChatComponent,
    SettingsComponent,
    SearchComponent,
    ContactComponent,
    ViewProfileComponent,
    ContactPageComponent,
    ActivePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, MixerService, ProfileService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
