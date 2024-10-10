import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import Img from "../../components/lazyLoadImage/Img";

const sources = [
  {
    embedcc: [
      "https://www.2embed.cc/embed/ID",
      "https://www.2embed.cc/embedtv/ID&s=sea&e=epi",
    ],
  },
  {
    smashstream: [
      "https://embed.smashystream.com/playere.php?tmdb=ID",
      "https://embed.smashystream.com/playere.php?tmdb=ID&season=sea&episode=epi",
    ],
  },
  {
    vidsrcdev:[
      "https://vidsrc.dev/embed/movie/ID",
      "https://vidsrc.dev/embed/tv/ID/sea/epi",
    ]
  },
  {
    vidsrcto: [
      "https://vidsrc.to/embed/movie/ID",
      "https://vidsrc.to/embed/tv/ID/sea/epi",
    ]
  },
  {
    vidsrcme: [
      "https://vidsrc.me/embed/movie?tmdb=ID",
      "https://vidsrc.me/embed/tv?tmdb=ID&season=sea&episode=epi",
    ],
  },
  {
    vidpro:[
      "https://vidsrc.pro/embed/movie/ID",
      "https://vidsrc.pro/embed/tv/ID/sea/epi",
    ]
  }
  ,
  {
    filmku:[
      "https://filmku.stream/embed/movie?tmdb=ID",
      "https://filmku.stream/embed/series?tmdb=ID&sea=sea&epi=epi",
    ]
  },
  {
    vidsrccc:[
      "https://vidsrc.cc/v2/embed/movie/ID",
      "https://vidsrc.cc/v2/embed/tv/ID/sea/epi",
    ]
  },
  {
    multiembed: [
      "https://multiembed.mov/?video_id=ID&tmdb=1",
      "https://multiembed.mov/?video_id=ID&tmdb=1&s=sea&e=epi",
    ],
  },
  {
    autoembed: [
      "https://player.autoembed.cc/embed/movie/ID",
      "https://player.autoembed.cc/embed/tv/ID/sea/epi",
    ],
  },
  {
    autoembedco:[
      "https://autoembed.co/movie/tmdb/ID",
      "https://autoembed.co/tv/tmdb/ID-sea-epi",
    ]
  },
  {
    moviesapi: [
      "https://moviesapi.club/movie/ID",
      "https://moviesapi.club/tv/ID-sea-epi",
    ],
  },
  {
    NontonGo: [
      "https://www.NontonGo.win/embed/movie/ID",
      "https://www.NontonGo.win/embed/tv/?id=ID&s=sea&e=epi",
    ],
  },
  {
    CineFlow: [
      "https://server-t4sa.onrender.com/tmdb/ID",
      "https://server-t4sa.onrender.com/tmdb/TD/sea/epi",
    ],
  },
  // {
  //   awstream: [
  //     "https://beta.awstream.net/watch?v=title-8211-episode-1&lang=hindi",
  //     "https://beta.awstream.net/watch?v=title-8211-episode-01&lang=hindi",
  //     "https://beta.awstream.net/watch?v=title-season--02-8211-episode-7&lang=hindi",
  //   ],
  // },
];

const Player = () => {
  let backdrop_path = localStorage.getItem("current_backdrop_path");
  const storedSeasonsInfo = localStorage.getItem("current_seasons_info");
  const seasonsDataTemp = storedSeasonsInfo ? JSON.parse(storedSeasonsInfo) : [];
  const seasonsData = seasonsDataTemp?.filter(
    (season) => season?.name !== "Specials"
  );
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const { mediaType, id, title } = useParams();
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(2);
  const [selectedSource, setSelectedSource] = useState("");
  const [cineFlowUrl, setCineFlowUrl] = useState("");
  const [isError, setIsError] = useState(false);
  
  // const formatTitle = (title) => {
  //   return title.replace(/\s+/g, "-");
  // };

  // const fetchEpisodeFormat = async (episodeNumber) => {
  //   // Here, fetch or determine the format from the API response
  //   // Simulating API response check
  //   const episodeFormats = ["01", "001", "0001", "2", "02", "3", "03", "4", "04","05", "6", "06", "7", "07", "8", "08", "9", "09"]; // This simulates possible API responses
  //   const formattedEpisode = episodeFormats.find((format) =>
  //     format.endsWith(episodeNumber.toString())
  //   );

  //   return formattedEpisode || episodeNumber.toString();
  // };

  // Fetch CineFlow data when needed
// Fetch CineFlow data when needed
const fetchCineFlowUrl = async () => {
  try {
    let apiUrl;

    if (mediaType === "tv") {
      // TV show API
      apiUrl = `https://server-t4sa.onrender.com/tmdb/${id}/${selectedSeason}/${selectedEpisode}`;
    } else {
      // Movie API
      apiUrl = `https://server-t4sa.onrender.com/tmdb/${id}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.data.url) {
      setCineFlowUrl(data.data.url);
      setIsError(false);
    } else {
      setIsError(true);
    }
  } catch (error) {
    console.error("Error fetching CineFlow data:", error);
    setIsError(true);
  }
};

  const makeSource = async () => {
    let epi = selectedEpisode;
    let sea = selectedSeason;
    let index = selectedSourceIndex;
    let selectedSource;

    if (mediaType == "tv") {
      switch (index || 0) {
        case 0:
          selectedSource = sources[0].embedcc[1].replace(
            "ID&s=sea&e=epi",
            `${id}&s=${sea}&e=${epi}`
          );
          break;
        case 1:
          selectedSource = sources[1].smashstream[1].replace(
            "ID&season=sea&episode=epi",
            `${id}&season=${epi}&episode=${epi}`
          );
          break;
        case 2:
          selectedSource = sources[2].vidsrcdev[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 3:
          selectedSource = sources[3].vidsrcto[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 4:
          selectedSource = sources[4].vidsrcme[1].replace(
            "ID&season=sea&episode=epi",
            `${id}&season=${sea}&episode=${epi}`
          );
          break;
        case 5:
          selectedSource = sources[5].vidpro[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 6:
          selectedSource = sources[6].filmku[1].replace(
            "ID&sea=sea&epi=epi",
            `${id}&sea=${sea}&epi=${epi}`
          );
          break;
        case 7:
            await fetchCineFlowUrl(); // Fetch CineFlow URL
            break;
        case 8:
          selectedSource = sources[7].vidsrccc[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 9:
          selectedSource = sources[8].multiembed[1].replace(
            "ID&tmdb=1&s=sea&e=epi",
            `${id}&tmdb=1&s=${sea}&e=${epi}`
          );
          break;
        case 10:
            selectedSource = sources[9].autoembed[1].replace(
              "ID/sea/epi",
              `${id}/${sea}/${epi}`
            );
            break;
          case 11:
              selectedSource = sources[10].autoembedco[1].replace(
                "ID-sea-epi",
                `${id}-${sea}-${epi}`
              );
              break;
          case 12:
              selectedSource = sources[11].moviesapi[1].replace(
                "ID-sea-epi",
                `${id}-${sea}-${epi}`
              );
              break;
          case 13:
              selectedSource = sources[12].NontonGo[1].replace(
                "ID&s=sea&e=epi",
                `${id}&s=${sea}&e=${epi}`
              );
              break;
        default:
          selectedSource = sources[2].vidpro[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
      }
    } else {
      switch (index || 0) {
        case 0:
          selectedSource = sources[0].embedcc[0].replace("ID", id);
          break;
        case 1:
          selectedSource = sources[1].smashstream[0].replace("ID", id);
          break;
        case 2:
          selectedSource = sources[2].vidsrcdev[0].replace("ID", id);
          break;
        case 3:
          selectedSource = sources[3].vidsrcto[0].replace("ID", id);
          break;
        case 4:
          selectedSource = sources[4].vidsrcme[0].replace("ID", id);
          break;
        case 5:
          selectedSource = sources[5].vidpro[0].replace("ID", id);
          break;
        case 6:
          selectedSource = sources[6].filmku[0].replace("ID", id);
          break;
        case 7:
            await fetchCineFlowUrl();
            break;
        case 8:
          selectedSource = sources[7].vidsrccc[0].replace("ID", id);
          break;
        case 9:
            selectedSource = sources[8].multiembed[0].replace("ID", id);
            break;        
        case 10:
            selectedSource = sources[9].autoembed[0].replace("ID", id);
            break;        
        case 11:
            selectedSource = sources[10].autoembedco[0].replace("ID", id);
            break;        
        case 12:
            selectedSource = sources[11].moviesapi[0].replace("ID", id);
            break;        
        case 13:
            selectedSource = sources[12].NontonGo[0].replace("ID", id);
            break;
        default:
          selectedSource = sources[2].vidpro[0].replace("ID", id);
          break;
      }
    }
    setSelectedSource(selectedSource);
  };

  const handleSeasonChange = (event) => {
    const selectedSeasonNumber = parseInt(event.target.value, 10);
    setSelectedSeason(selectedSeasonNumber);
    setSelectedEpisode(1);
  };

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  const handleButtonClick = (index) => {
    setSelectedSourceIndex(index);
  };

  useEffect(() => {
    makeSource();
  }, [selectedSourceIndex, selectedEpisode, selectedSeason]);

  return (
    <div className="player">
      <>
        <div className="backdrop1-img">
          <Img src={backdrop_path} />
        </div>
        {isError ? ( // Show 404 page if no data or error
          <iframe
            id="dd"
            src="https://beta.awstream.net/watch?v=days-with-my-stepsister-8211-episode-ghasdghasdgh&lang=hindi"
            width="90%"
            frameBorder="0"
            scrolling="yes"
            allowFullScreen
          ></iframe>
        ) : selectedSourceIndex === 7 ? (
          <iframe
            id="dd"
            src={cineFlowUrl}
            width="90%"
            frameBorder="0"
            scrolling="yes"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            id="dd"
            src={selectedSource}
            width="90%"
            frameBorder="0"
            scrolling="yes"
            allowFullScreen
          ></iframe>
        )}
        <p style={{
          color: "white",
        }}>If current Source doesn't work, please try other Sources</p>
        <div className="source-buttons">
          {sources.map((source, index) => (
            <div
              key={index}
              onClick={() => handleButtonClick(index)}
              className={
                selectedSourceIndex === index
                  ? "source-btn-active button-62"
                  : "button-62"
              }
            >
              Source {index + 1}
            </div>
          ))}
        </div>
        {mediaType == "tv" && (
          <div id="seasons">
            <select
              id="seasonsDropdown"
              onChange={handleSeasonChange}
              value={selectedSeason || ""}
            >
              {seasonsData.map((season) => (
                <option className="season-option" key={season.id} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>
            {selectedSeason !== null && (
              <div>
                <div className="episode-container-anime">
                  {Array.from(
                    { length: seasonsData[selectedSeason - 1]?.episode_count },
                    (_, index) => index + 1
                  ).map((episodeNumber) => (
                    <div
                      className={
                        selectedEpisode === episodeNumber
                          ? "episode-div-active episode-div"
                          : "episode-div"
                      }
                      key={episodeNumber}
                      onClick={() => handleEpisodeClick(episodeNumber)}
                    >
                      S{selectedSeason} E{episodeNumber}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Player;
