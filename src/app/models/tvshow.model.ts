export interface TvShow {
  _id?: string;  // Assuming your TV shows have MongoDB IDs
  name: string;
  genre: string;
  rating: number;
  firstAirDate: Date;
  overview: string;
  userId: string;
  imageUrl?: string; // Add this property for the image URL
}
  
  