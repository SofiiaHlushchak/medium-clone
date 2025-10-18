import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesEffect } from './store/effects/addToFavorites.effect';
import { AddToFavoriteComponent } from './components/addToFavorites/addToFavorites.component';
import { AddToFavoritesService } from './services/addToFavorites.service';

@NgModule({
    imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
    declarations: [AddToFavoriteComponent],
    exports: [AddToFavoriteComponent],
    providers: [AddToFavoritesService],
})
export class AddToFavoriteModule {}
