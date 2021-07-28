import { Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id); // parseInt(id) === +id
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie;
    }

    deleteOne(id: number): boolean {
        this.getOne(id); // 위에서 예외 처리를 해놨으니까 그냥 편하게 다시 호출해서 확인하네 아주 굿
        this.movies = this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id: number, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData })
    }

}
