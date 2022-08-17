import { Photo } from "../models/photos";
import { db } from "../dbConnect/dbConnect";
import { ObjectId } from "mongodb";

interface PhotoServices {
  updateLikes(id: string, inc: number): Promise<Photo>; //expect promise when go to db
  createPhoto(photo: Photo): Promise<string>;
  //   createComment(id: string, comment: string): Promise<Photo>; //return photo with comments
  getAllPhotos(): Promise<Photo[]>;
}

const photoCollections = db.collection<Photo>("photos");

export const getAllPhotos = async (): Promise<Photo[]> => {
  const photos = await photoCollections.find().toArray();
  return photos;
};

export const createPhoto = async (photo: Photo): Promise<string> => {
  try {
    const res = await photoCollections.insertOne(photo);
    return res.insertedId.toString();
  } catch (error) {
    return "Something went wrong";
  }
};

//Pass Id and find photo. creates object with that Id to match the photo with that Id in db. increment likes. mongo recognizes _id
export const updateLikes = async (
  id: string,
  inc: number = 1
): Promise<Photo> => {
  const result = await photoCollections.findOneAndUpdate(
    { _id: new ObjectId(id) }, //filter
    { $inc: { likes: inc } }
  );
  const updatedPhoto = result.value as Photo; //value from find, not the update
  return updatedPhoto;
};

// export const createComment = async (id: string, comment: string): Promise<Photo> => {

// }

export const photoServices: PhotoServices = {
  getAllPhotos,
  createPhoto,
  updateLikes,
  //    createComment
};
