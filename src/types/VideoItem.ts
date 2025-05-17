export interface User {
  username: string;
  profileImage: string;
}

export interface VideoItem {
  contentUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  user: User;
  orgImage:string;
  orgName:string;
  description:string;
  totalLikes:string;
  totalComments:string;
  id:any;
  
}
