export interface USER {
  _id: string;
  fullName: string;
  username: string;
  profilePicture: string;
}

export interface PROFILE{
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
  bannerImage: string;
  isAccountVerified: boolean;
  bio: string;
  location: string;
  followers: string[];
  following: string[];
  posts:string[],
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfile{
  fullName?:string;
  location?:string;
  bio?:string;
  image?:string;
  bannerImage?:string;
}