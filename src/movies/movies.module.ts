import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService], //dependency injection nest가 위에 컨트롤러에 넣어줌 위
})
export class MoviesModule { }
