import { ApiProperty } from "@nestjs/swagger";


interface Categories {
    id: number
}

export class CreateNoteDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    content: string

    @ApiProperty({ default: false })
    active: boolean

    @ApiProperty({ required: false })
    categories?: Categories[]

    @ApiProperty()
    userId: string
}


