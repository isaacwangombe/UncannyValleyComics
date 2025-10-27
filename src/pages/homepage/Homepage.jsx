import React, { useState, useEffect } from "react";
import Navbars from "./../../Components/navbar/Navbar";
import HomepageCarousel from "./../../Components/homepageCarousel/HomepageCarousel";
import { MultiCarousel } from "../../Components/multiCarousel/MultiCarousel";
import "./Homepage.css";
import Footer from "../../Components/footer/Footer";
import Button from "react-bootstrap/Button";
import { fetchTrendingProducts } from "../../api";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("comics");
  const [communityTab, setCommunityTab] = useState("events");

  const [trendingComics, setTrendingComics] = useState([]);
  const [trendingMerch, setTrendingMerch] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTrending() {
      try {
        const responses = await Promise.all([
          fetchTrendingProducts("comics"),
          fetchTrendingProducts("merch"),
          fetchTrendingProducts("events"),
        ]);

        const [comicsData, merchData, eventsData] = responses;
        const normalize = (data) =>
          Array.isArray(data) ? data : data.results || [];

        setTrendingComics(normalize(comicsData));
        setTrendingMerch(normalize(merchData));
        setTrendingEvents(normalize(eventsData));

        console.log("Trending loaded:", {
          comics: normalize(comicsData),
          merch: normalize(merchData),
          events: normalize(eventsData),
        });
      } catch (err) {
        console.error("Error loading trending products:", err);
      }
    }

    loadTrending();
  }, []);

  // navigate to store with category slug
  const goToCategory = (slug) => {
    if (!slug) return navigate("/store");
    navigate(`/store?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div>
      <div className="px-3 px-md-5 px-lg-9 py-4">
        <HomepageCarousel onShopClick={(slug) => goToCategory(slug)} />
      </div>

      {/* Trending Now Section */}
      <div
        className="px-3 py-4 mx-3 mx-md-5 mx-lg-9 trending-now rounded-4"
        style={{ minHeight: "700px", position: "relative" }}
      >
        <h1 className="mona-sans-base fs-1 mx-5 my-3">
          Trending <span className="mona-sans-italic">Now</span>
        </h1>

        {/* Tab Buttons */}
        <div className="tab-buttons mx-5 my-3">
          <button
            className={activeTab === "comics" ? "active" : ""}
            onClick={() => setActiveTab("comics")}
          >
            Comics
          </button>
          <button
            className={activeTab === "merch" ? "active" : ""}
            onClick={() => setActiveTab("merch")}
          >
            Merch
          </button>
        </div>

        <div className="tab-content-wrapper">
          <div className={`fade-tab ${activeTab === "comics" ? "show" : ""}`}>
            <MultiCarousel products={trendingComics} />
            <Button
              variant="dark"
              size="lg"
              className="btn-wide"
              onClick={() => goToCategory("comics")}
            >
              View all
            </Button>
          </div>
          <div className={`fade-tab ${activeTab === "merch" ? "show" : ""}`}>
            <MultiCarousel products={trendingMerch} />
            <Button
              variant="dark"
              size="lg"
              className="btn-wide"
              onClick={() => goToCategory("merch")}
            >
              View all
            </Button>
          </div>
        </div>
      </div>

      {/* In the Community Section */}
      <div
        className="px-3 py-4 mx-3 mx-md-5 mx-lg-9 rounded-4"
        style={{ minHeight: "600px", position: "relative" }}
      >
        <h1 className="mona-sans-base fs-1 mx-5 my-3">
          In the <span className="mona-sans-italic">Community</span>
        </h1>

        <div className="tab-buttons mx-5 my-3">
          <button
            className={communityTab === "events" ? "active" : ""}
            onClick={() => setCommunityTab("events")}
          >
            Events
          </button>
          <button
            className={communityTab === "publishing" ? "active" : ""}
            onClick={() => setCommunityTab("publishing")}
          >
            Publishing
          </button>
        </div>

        <div className="tab-content-wrapper">
          <div
            className={`fade-tab ${communityTab === "events" ? "show" : ""}`}
          >
            <MultiCarousel products={trendingEvents} />
            <Button
              variant="dark"
              size="lg"
              className="btn-wide"
              onClick={() => goToCategory("events")}
            >
              View all
            </Button>
          </div>
          <div
            className={`fade-tab ${
              communityTab === "publishing" ? "show" : ""
            }`}
          >
            <MultiCarousel products={[]} />
            <Button
              variant="dark"
              size="lg"
              className="btn-wide"
              onClick={() => goToCategory(null)}
            >
              View all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
