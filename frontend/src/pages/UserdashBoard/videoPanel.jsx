import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AddVideo } from "../../slicers/video-slicer";

const VideoPanel = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const dispacher = useDispatch();

  useEffect(() => {
    axios
      .get("https://lmstype.onrender.com/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("https://lmstype.onrender.com/allVideo")
      .then((response) => setVideos(response.data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const fetchVideoById = (id) => {
    if (!id) {
      setSelectedVideo(null);
      return;
    }

    axios
      .get(`https://lmstype.onrender.com/getVid/${id}`)
      .then((response) => setSelectedVideo(response.data))
      .catch((error) => console.error("Error fetching selected video:", error));
  };

  const filteredVideos = selectedCategory
    ? videos.filter((video) => String(video.cat_id) === String(selectedCategory))
    : videos;

    function addWatchlater(video){
      dispacher(AddVideo(video))
    }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h4>Select a Category</h4>
          <select
            className="form-select mb-3"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.cat_id}>
                {category.name}
              </option>
            ))}
          </select>

          <h4>Select a Video</h4>
          <select
            className="form-select mb-3"
            onChange={(e) => fetchVideoById(e.target.value)}
            value={selectedVideo ? selectedVideo.id : ""}
          >
            <option value="">Select a video</option>
            {filteredVideos.map((video) => (
              <option key={video.id} value={video.id}>
                {video.title}
              </option>
            ))}
          </select>
          <h4>Watch Later </h4>
           <div>{dispacher}</div>

          <div className="video-container">
            {selectedVideo && (
              <div>
                <h5 className="text-center">{selectedVideo.title}</h5>
                <video
                  controls
                  src={`https://lmstype.onrender.com/uploads/video/${selectedVideo.videoFile}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "10px",
                  }}
                />
                <p className="text-center mt-2">{selectedVideo.description}</p>
              </div>
            )}
          </div>

          
        </div>

        <div className="col-md-8">
          <h4>All Videos</h4>
          <div className="row g-3">
            {filteredVideos.map((video) => (
              <div key={video.id} className="col-md-4">
                <div className="video-container border p-2 rounded shadow">
                  <video
                    controls
                    src={`https://lmstype.onrender.com/uploads/video/${video.videoFile}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="d-flex justify-content-between">
                      <p className="text-center mt-2">{video.title}</p>
                      <button className="btn btn-success bi bi-view-list" onClick={addWatchlater}>Watch Later</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
