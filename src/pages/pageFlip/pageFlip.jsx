import React from "react";
import { useRef } from "react";
import { Button } from "@material-tailwind/react";

import HTMLFlipBook from "react-pageflip";
import "./PageFlip.css";
import ComicImages from "../../assets/ComicImages/ComicImagesSmaller";
import PageOne from "./Comicpages/Page1/Page1";
import PageTwo from "./Comicpages/Page2/Page2";
import PageThree from "./Comicpages/Page3/Page3";
import NavbarWithSubmenu from "./../../components/navbar/navbar";

const PageFlip = () => {
  const book = useRef();

  // Define the class names (these will cycle per page)
  const classNames = ["page-1", "page-2", "page-3"];

  // Define the number of names to show per page (7, 8, 9)
  const nameCounts = [7, 6, 8];

  // Helper function to get the images for each page
  const getImagesForPage = (startIndex, count) => {
    return ComicImages.slice(startIndex, startIndex + count);
  };

  // Initialize current index to track the start index as we move through pages
  let currentIndex = 0;

  // Continue rendering until all items are processed
  let remainingItems = ComicImages.length;

  return (
    <div className="">
      <NavbarWithSubmenu />
      <div className="">
        <Button
          color="blue"
          className="mx-10"
          onClick={() => book.current.pageFlip().flipPrev()}
        >
          Prev page
        </Button>
        <Button color="blue" onClick={() => book.current.pageFlip().flipNext()}>
          Next page
        </Button>
      </div>
      <div className="cont">
        <HTMLFlipBook
          width={500}
          height={1000}
          size="stretch"
          showCover={false}
          usePortrait={false}
          swipeDistance={0}
          // autoSize={false}
          useMouseEvents={false}
          ref={book}
        >
          {Array.from({
            length: Math.ceil(ComicImages.length / Math.min(...nameCounts)),
          }).map((_, pageIndex) => {
            // Cycle through the class names and name counts
            const className = classNames[pageIndex % classNames.length];
            const namesToShow = nameCounts[pageIndex % nameCounts.length];

            // If there are fewer images left than namesToShow, adjust namesToShow
            const adjustedNamesToShow = Math.min(namesToShow, remainingItems);

            // Get the images for this page based on the current index
            const imagesForPage = getImagesForPage(
              currentIndex,
              adjustedNamesToShow
            );
            let PageComponent;
            switch (namesToShow) {
              case 7:
                PageComponent = PageOne;
                break;
              case 6:
                PageComponent = PageTwo;
                break;
              case 8:
                PageComponent = PageThree;
                break;
              default:
                return null; // Fallback
            }

            // Render the FlipPage component with the available images
            const pageComponent = (
              <div className="">
                <PageComponent key={pageIndex} images={imagesForPage} />

                {/* <PageTwo
                key={pageIndex}
                images={imagesForPage}
                className={className}
              /> */}
              </div>
            );

            // Update the currentIndex for the next page and remaining items
            currentIndex += adjustedNamesToShow;
            remainingItems -= adjustedNamesToShow;

            return pageComponent;
          })}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default PageFlip;
