import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { MixerComponent } from './components/mixer/mixer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { InterChatComponent } from './components/inter-chat/inter-chat.component';
import { SearchComponent } from './components/search/search.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ViewProfileComponent },
  { path: 'mixer', component: MixerComponent },
  { path: 'mixer/:id', component: MixerComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'ichat', component: InterChatComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'settings', component: SettingsComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
