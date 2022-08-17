import { Router, Request, Response } from "express";
// import { getAllPhotos } from "../services/photo-services";
import { photoServices } from "../services/photo-services";

export const photoRouter = Router();

photoRouter.get("/", async (req: Request, res: Response) => {
  const results = await photoServices.getAllPhotos();
  res.status(200).send(results);
});

photoRouter.post("/", async (req: Request, res: Response) => {
  //Deconstruct req.body
  const { photoUrl, description } = req.body;
  if (!photoUrl) {
    res.status(400).send("Photo url is required.");
    return;
  }
  //Should work if object we receive from request.body matches model of what we are expecting
  const insertedId = await photoServices.createPhoto({ photoUrl, description });
  res.status(201).send({ insertedId });
});

photoRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (!likes) {
    res.status(400).send("Likes are required");
  }

  const photo = await photoServices.updateLikes(id, likes);
  res.status(200).send(photo);
});
