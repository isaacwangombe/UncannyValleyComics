// App.js
import React from "react";
import ComicImagesSmaller from "./../../assets/ComicImages/ComicImagesSmaller";
import ComicImages from "../../assets/ComicImages/ComicImagesSmaller";
import Categories from "../../assets/ComicImages/CategoriesList";

const About = () => {
  return (
    <div>
      {Categories.map((category) => (
        <div key={category}>
          <h2>{category} Comics</h2>
          <div className="comic-list">
            {ComicImages.filter((comic) => comic.Category === category).map(
              (comic) => (
                <div key={comic.id}>
                  <h3>{comic.Name}</h3>
                  <img
                    src={comic.Image}
                    alt={comic.Name}
                    style={{ width: "100px" }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
