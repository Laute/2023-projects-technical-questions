import express from "express";

type CowboyMetadata = { name: string; lassoLength: number };
type AnimalMetadata = { type: "pig" | "cow" | "flying_burger" };
type Location = { x: number; y: number };

type SpaceCowboy = {
  type: "space_cowboy";
  metadata: CowboyMetadata;
  location: Location;
};
type SpaceAnimal = {
  type: "space_animal";
  metadata: AnimalMetadata;
  location: Location;
};
type SpaceEntity = SpaceCowboy | SpaceAnimal;

let spaceEntities: SpaceEntity[] = [];

// app

const app = express();
app.use(express.json());

// adds an entity to the space database
app.post("/entity", (req, res) => {
  // TODO: validate input
  const entities = req.body.entities as SpaceEntity[];
  spaceEntities = spaceEntities.concat(entities);
  res.status(200).json({});
});

// /lassoable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  // TODO: fill me in
});

app.listen(8080);
