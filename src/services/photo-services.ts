import {Photo} from "../models/photos"
import {db} from "../dbConnect/dbConnect"

interface PhotoServices {
    updateLikes(id: string, inc: number): Promise<Photo>,  //expect promise when go to db
    createPhoto(photo:Photo): Promise<string>,
    createComment(id: string, comment: string): Promise<Photo>, //return photo with comments
    getAllPhotos(): Promise<Photo[]>
}

const photoCollections = db.collection<Photo>("photos")

export const getAllPhotos = async (): Promise<Photo[]> => {
const photos = await photoCollections.find().toArray()
return photos;
}