import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
    imports: [
      CommonModule,
      ButtonModule
    ],
    declarations: [
      SliderComponent,
      BannerComponent
    ],
    exports: [
      SliderComponent,
      BannerComponent
    ]
})
export class UiModule {}
