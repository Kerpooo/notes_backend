import { Note } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';


export class NoteEntity implements Note {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty({ default: false })
    active: boolean;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: string;

}
