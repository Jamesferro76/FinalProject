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
import { InterChatComponent } from './inter-chat/inter-chat.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, MixerService, ProfileService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
