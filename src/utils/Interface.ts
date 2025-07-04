export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IUser {
  id?: number;
  username: string;
  name: string;
  role?: string;
  restaurants?: IRestaurant[];
  reviews?: IReview[];
  comments?: IComment[];
}

export interface IRestaurant {
  id?: number;
  name: string;
  description: string;
  photoUrl: string;
  location: string;
  mapsUrl: string;
  userId?: number;
  user?: IUser;
  reviews?: IReview[];
}

export interface IReview {
  id?: number;
  title: string;
  text: string;
  rating: number;
  createdAt?: Date;
  user?: IUser;
  restaurant?: IRestaurant;
  comments?: IComment[];
}

export interface IComment {
  id?: number;
  text: string;
  createdAt?: Date;
  user?: IUser;
  revie?: IReview;
}
