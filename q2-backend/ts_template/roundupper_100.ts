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

// returns all space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  // TODO: validate input
  const name = req.query.cowboy_name as string;
  const cowboys = spaceEntities.filter(
    (entity): entity is SpaceCowboy => entity.type === "space_cowboy"
  );
  const cowboy = cowboys.find((cowboy) => cowboy.metadata.name === name) as SpaceCowboy; // FIXME: narrow type instead by validating input

  const animals = spaceEntities.filter(
    (entity): entity is SpaceAnimal => entity.type === "space_animal"
  );
  const lassoableAnimals = animals.filter(
    (animal) => distance(cowboy.location, animal.location) <= cowboy.metadata.lassoLength
  );

  res.status(200).json({
    space_animals: lassoableAnimals.map((animal) => ({
      type: animal.metadata.type,
      location: animal.location,
    })),
  });
});

app.listen(8080);

function distance(location1: Location, location2: Location) {
  const xDifference = location1.x - location2.x;
  const yDifference = location1.y - location2.y;
  return Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));
}
