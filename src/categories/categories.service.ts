import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }


  //CRUD Operations

  create(CreateCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: CreateCategoryDto
    })
  }

  findAll(userId: string) {
    return this.prisma.category.findMany({
      where: {
        userId
      }
    })
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id }
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    })
  }

  async remove(id: number) {
    const notesWithCategory = await this.prisma.note.findMany({
      where: {
        categories: {
          some: { id },
        },
      },
    });

    await Promise.all(
      notesWithCategory.map((note) =>
        this.prisma.note.update({
          where: { id: note.id },
          data: {
            categories: {
              disconnect: { id },
            },
          },
        })
      )
    );

    // Finalmente, elimina la categoría
    return this.prisma.category.delete({ where: { id } });
  }
}  
