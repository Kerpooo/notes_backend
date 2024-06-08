import { ApiProperty } from "@nestjs/swagger"
import {

    IsString,
    MaxLength,
    MinLength,
    IsUUID
} from 'class-validator'

export class CreateCategoryDto {
    
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    userId: string

}




