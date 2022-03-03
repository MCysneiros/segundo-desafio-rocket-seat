import { MovieCard } from './MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface MovieProps {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface ContentProps {
	selectedGenreId: number;
	setSelectedGenre: (genre: GenreResponseProps) => void;
}
export function Content({ selectedGenreId, setSelectedGenre }: ContentProps) {
	const [movies, setMovies] = useState<MovieProps[]>([]);

	useEffect(() => {
		api
			.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
			.then(response => {
				setMovies(response.data);
			});

		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
			setSelectedGenre(response.data);
		});
	}, [selectedGenreId]);

	return (
		<main>
			<div className='movies-list'>
				{movies.map(movie => (
					<MovieCard
						key={movie.imdbID}
						title={movie.Title}
						poster={movie.Poster}
						runtime={movie.Runtime}
						rating={movie.Ratings[0].Value}
					/>
				))}
			</div>
		</main>
	);
	// Complete aqui
}
