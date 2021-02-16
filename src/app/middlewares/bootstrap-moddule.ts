import { NgModule } from '@angular/core';  
import { AccordionModule } from 'ngx-bootstrap/accordion'  
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';  
import { ModalModule } from 'ngx-bootstrap/modal';  
import { TabsModule } from 'ngx-bootstrap/tabs';  
import { PopoverModule } from 'ngx-bootstrap/popover';
  
@NgModule({  
    imports: [PopoverModule.forRoot(), AccordionModule.forRoot(), BsDropdownModule.forRoot(), ModalModule.forRoot(), TabsModule.forRoot()],  
    exports: [AccordionModule, BsDropdownModule, ModalModule, TabsModule, PopoverModule],  
    declarations: [],  
    providers: []  
})  
  
export class SharedBootstrapModule {  
  
}  