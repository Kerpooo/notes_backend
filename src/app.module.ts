import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [NotesModule, CategoriesModule],

})
export class AppModule { }
