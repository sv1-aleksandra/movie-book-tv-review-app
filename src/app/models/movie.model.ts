export interface Movie {
    id: string;                  // Unique identifier for the movie
    title: string;               // Title of the movie
    description: string;         // Brief description or synopsis of the movie
    type: string;                // Type of content (e.g., 'movie', 'series')
    releaseDate: string;         // Release date of the movie
    genre: string[];             // List of genres associated with the movie
    rating: number;              // Average rating of the movie
    director: string;            // Director of the movie
    cast: string[];              // List of main cast members
    duration: number;            // Duration of the movie in minutes
    posterUrl: string;           // URL to the movie poster image
  }
  