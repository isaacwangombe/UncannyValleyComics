import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Categories from "../../assets/ComicImages/CategoriesList";
import ComicImages from "../../assets/ComicImages/ComicImagesSmaller";
import "./homepage.css";
import African from "../../assets/HomepageImages/African.jpg";
import Clothes from "../../assets/HomepageImages/Clothes.jpg";
import Publish from "../../assets/HomepageImages/Publish.jpg";
import NavbarWithSubmenu from "../../components/navbar/navbar";

const Homepage = () => {
  return (
    <div className="">
      <NavbarWithSubmenu />
      <div className="home-container">
        <div className="">
          <figure className="relative h-64 w-full">
            <img
              className="homepage-img h-full w-full rounded-xl object-cover object-center  shadow-xl shadow-blue-gray-900/50"
              src={African}
              alt="nature image"
            />
            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 text-left">
              <div>
                <Typography variant="h5" color="white">
                  Latest Comics
                </Typography>
                <Typography
                  color="white"
                  className="mt-4  text-gray-400 font-normal"
                >
                  Explore our diverse selection of comic books, featuring
                  everything from captivating African comics to iconic titles
                  from major publishers like DC and Marvel. Whether you're a fan
                  of superheroes, fantasy, or original African stories, we have
                  something for every comic lover.
                </Typography>
                <li>
                  <Link to="all-comics">
                    <Button color="blue" className="mt-4 ">
                      Explore
                    </Button>
                  </Link>
                </li>
              </div>
            </figcaption>
          </figure>
          <div className=" mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
            <figure className="img-container relative h-64 w-full">
              <img
                className="homepage-img h-full w-full rounded-xl object-cover object-center  shadow-xl shadow-blue-gray-900/50"
                src={Clothes}
                alt="nature image"
              />
              <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 text-left">
                <div>
                  <Typography variant="h5" color="white">
                    Merch Store
                  </Typography>
                  <Typography
                    color="white"
                    className="mt-4 font-normal text-gray-400"
                  >
                    Browse our stylish collection of hoodies, t-shirts, and
                    accessories, inspired by your favorite comics and
                    characters.
                  </Typography>
                  <Button color="blue" className="mt-4 ">
                    Explore
                  </Button>
                </div>
              </figcaption>
            </figure>
            <figure className="relative h-64 w-full">
              <img
                className="homepage-img h-full w-full rounded-xl object-cover object-center  shadow-xl shadow-blue-gray-900/50"
                src={Publish}
                alt="nature image"
              />
              <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 text-left">
                <div>
                  <Typography variant="h5" color="white">
                    Publish with us
                  </Typography>
                  <Typography
                    color="white"
                    className="mt-4 text-gray-400 font-normal"
                  >
                    Have a story to tell? Publish your comic or graphic novel
                    with us! We offer the platform and support to bring your
                    unique vision to life.
                  </Typography>
                  <Button color="blue" className="mt-4 ">
                    Explore
                  </Button>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className=" ">
          {Categories.map((category) => (
            <div key={category} className="">
              <h2 className="text-gray-800 text-2xl font-medium text-left my-10 mt-10">
                {category} Comics
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {ComicImages.filter((comic) => comic.Category === category).map(
                  (comic) => (
                    <div key={comic.id}>
                      <Card className="my-4 h-72">
                        <CardHeader color="blue-gray" className="relative h-56">
                          <img
                            src={comic.Image}
                            alt="card-image"
                            className="card-image"
                          />
                        </CardHeader>
                        <IconButton color="blue" className="card-shopping-cart">
                          <i className="fas fa-shopping-cart" />
                        </IconButton>
                        <CardBody>
                          <Typography
                            color="blue-gray"
                            className="text-sm mb-2 text-gray-700 uppercase text-left"
                          >
                            {comic.Name}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="mb-2 text-blue-gray-900 text-left"
                          >
                            {comic.Price} Kes
                          </Typography>
                        </CardBody>
                      </Card>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
