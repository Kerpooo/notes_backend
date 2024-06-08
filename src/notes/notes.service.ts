import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {


  constructor(private prisma: PrismaService) { }

  //CRUD operations

  //Create a note with or without categories
  create({ active, title, content, userId, categories }: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title,
        content,
        active,
        categories: {
          connect: categories
        },
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  findAll() {
    return this.prisma.note.findMany({ include: { categories: true } })

  }


  //From the query parameters this realize the query to filter active and categories
  findActiveOrCategories(active: boolean, categories: string[], userId: string) {
    return this.prisma.note.findMany({
      where: {
        userId,
        active: active,
        categories: {
          some: {
            name: {
              in: categories
            }
          }
        }
      },
      include: {
        categories: true
      }
    })
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({ where: { id }, include: { categories: true } });
  }

  // Update with categories function 
  update(id: number, { active, categories, title, content }: UpdateNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: {
        title,
        content,
        active,
        categories: { connect: categories }
      }
    })
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id } })
  }
}
