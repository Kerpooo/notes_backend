import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, ParseArrayPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  // Using query for filter the active/archive notes
  // Using query for filter by category
  @Get()
  @ApiQuery({ name: 'active', required: false, type: Boolean, description: 'Active notes' })
  @ApiQuery({ name: 'categories', required: false, type: [String], description: 'List of categories' })
  findAllWithQuery(
    @Query('active', new ParseBoolPipe({ optional: true, })) active?: boolean,
    @Query('categories', new ParseArrayPipe({ items: String, optional: true })) categories?: string[]) {
    return this.notesService.findActiveOrCategories(active, categories);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
