import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsArray,
    IsNumber,
    ValidateNested,
} from 'class-validator'

class CategoriesDTO {
    @IsNumber()
    id: number
}

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty()
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string

    @IsBoolean()
    @ApiProperty({ default: true })
    active: boolean

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoriesDTO)
    @ApiProperty({ required: false, type: [CategoriesDTO] })
    categories?: CategoriesDTO[]

    @IsString()
    @ApiProperty()
    userId: string
}


