import express, { Request, Response } from "express";
import multer from "multer";
import * as cloudinary from "cloudinary";
import * as fs from "fs";
import * as path from "path";

const upload = multer();

const objectsWithIds = [
  {
    "bodyPart": "neck",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/5QxHG38vusnG1c",
    "id": "1403",
    "name": "neck side stretch",
    "target": "levator scapulae",
    "secondaryMuscles": [
      "trapezius",
      "sternocleidomastoid"
    ],
    "instructions": [
      "Stand or sit up straight with your shoulders relaxed.",
      "Tilt your head to one side, bringing your ear towards your shoulder.",
      "Hold the stretch for 15-30 seconds.",
      "Repeat on the other side.",
      "Perform 2-4 sets on each side."
    ]
  },
  {
    "bodyPart": "neck",
    "equipment": "body weight",
    "gifUrl": "https://v2.exercisedb.io/image/2Smm3al0DPH7dT",
    "id": "0716",
    "name": "side push neck stretch",
    "target": "levator scapulae",
    "secondaryMuscles": [
      "trapezius",
      "sternocleidomastoid"
    ],
    "instructions": [
      "Stand or sit up straight with your shoulders relaxed.",
      "Tilt your head to the right, bringing your right ear towards your right shoulder.",
      "Place your right hand on the left side of your head and gently apply pressure to increase the stretch.",
      "Hold the stretch for 15-30 seconds.",
      "Repeat on the other side, tilting your head to the left and applying pressure with your left hand.",
      "Repeat the stretch 2-3 times on each side."
    ]
  }
]






const sortImagesRouter = express.Router();
sortImagesRouter.get(
  "/",
  // isAuth,
  // isAdmin,
  async (req: Request, res: Response) => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    try {
      // Step 1: Open the file directory of images(.gif) to be uploaded
      const folderPath =
        "C:/Users/EMMANUEL/.vscode/python rough work/NeckExercises"; // Change this to the path of your local folder
      const files = fs.readdirSync(folderPath);

      // Step 2: Return a list of the images to be uploaded
      const imageList: string[] = files.filter((file) => file.endsWith(".gif"));
      console.log(imageList);
      // Step 3: Create the variable of list of objects with "id"
      // Assuming objects with IDs are provided in req.body.objectsWithIds

      // Step 4: Match the object id to respective `image.gif name and append file directory as image_path
      const objectsWithImagePaths = objectsWithIds.map((obj) => {
        const id = obj.id;
        const gifUrl = obj.gifUrl;
        const bodyPart = obj.bodyPart;
        const equipment = obj.equipment;
        const name = obj.name;
        const target = obj.target;
        const secondaryMuscles = obj.secondaryMuscles;
        const instructions = obj.instructions;

        const matchingImage = imageList.find((image) => image.startsWith(id));
        if (matchingImage) {
          const imagePath = path.join(folderPath, matchingImage);
          return {
            id,
            image_path: imagePath,
            bodyPart,
            equipment,
            gifUrl,
            name,
            target,
            secondaryMuscles,
            instructions,
          };
        } else {
          console.error(`Error: Image file for ID ${id} not found.`);
          return { id };
        }
      });

      // Step 5: From the final list of objects with respective image path, loop through each object and upload image path to Cloudinary
      for (const obj of objectsWithImagePaths) {
        if (obj.image_path) {
          console.log(`Uploading ${obj.image_path} to Cloudinary...`);
          const result = await cloudinary.v2.uploader.upload(obj.image_path, {
            folder: "Exercise Gif",
          });
          console.log(
            `Uploaded to Cloudinary. URL: ${result.secure_url}, ${result.id}`
          );

          // Step 6: Append the returned Cloudinary URL to the object as "gifUrl"
          obj.gifUrl = result.secure_url;
          delete (obj as { image_path?: string }).image_path;
        }
      }

      // Step 7: Return list of objects
      res.json(objectsWithImagePaths);

      // Step 8: Write the returned list of objects to a JSX file
      const jsxFilePath = path.join(__dirname, "output.jsx");
      const jsxContent = `const data = ${JSON.stringify(objectsWithImagePaths)}; export default data;`;
      fs.writeFileSync(jsxFilePath, jsxContent);
      console.log(`Data written to ${jsxFilePath}`);
    } catch (err: any) {
      console.error("Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

export default sortImagesRouter;
