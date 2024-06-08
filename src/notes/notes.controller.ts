import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
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


  /**
   * I use this for the filt
   * @param userId String
   * @param active Boolean
   * @param categories Array of strings
   * @returns Array of Notes objects that match user ID.
   */
  @Get()
  @ApiQuery({ name: 'userId', required: true, type: String, description: 'User id' })
  @ApiQuery({ name: 'active', required: false, type: Boolean, description: 'Active notes' })
  @ApiQuery({ name: 'categories', required: false, type: [String], description: 'List of categories' })
  findAllWithQuery(
    @Query('userId') userId: string,
    @Query('active', new ParseBoolPipe({ optional: true, })) active?: boolean,
    @Query('categories', new ParseArrayPipe({ items: String, optional: true })) categories?: string[]) {
    return this.notesService.findActiveOrCategories(active, categories, userId);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }
}
