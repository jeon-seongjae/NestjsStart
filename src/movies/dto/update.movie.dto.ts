import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto {

//     @IsString()
//     readonly title?: string;  // ? = 필수값이 아니라는 거 php@같은 느낌
//     @IsNumber()
//     readonly year?: number;

//     @IsString({ each: true })
//     readonly genres?: string[];
// }

export class UpdateMovieDto extends PartialType(CreateMovieDto) { }