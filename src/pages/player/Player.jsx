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
    vidsrc: [
      "https://vidsrc.me/embed/movie?tmdb=ID",
      "https://vidsrc.me/embed/tv?tmdb=ID&season=sea&episode=epi",
    ],
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
    awstream: [
      "https://beta.awstream.net/watch?v=title-8211-episode-1&lang=hindi",
      "https://beta.awstream.net/watch?v=title-8211-episode-01&lang=hindi",
      "https://beta.awstream.net/watch?v=title-season--02-8211-episode-7&lang=hindi",
    ],
  },
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

  const formatTitle = (title) => {
    return title.replace(/\s+/g, "-");
  };

  const fetchEpisodeFormat = async (episodeNumber) => {
    // Here, fetch or determine the format from the API response
    // Simulating API response check
    const episodeFormats = ["01", "001", "0001", "2", "02", "3", "03", "4", "04","05", "6", "06", "7", "07", "8", "08", "9", "09"]; // This simulates possible API responses
    const formattedEpisode = episodeFormats.find((format) =>
      format.endsWith(episodeNumber.toString())
    );

    return formattedEpisode || episodeNumber.toString();
  };

  const makeSource = async () => {
    let epi = await fetchEpisodeFormat(selectedEpisode); // Fetch or determine the episode format
    let sea = selectedSeason;
    let index = selectedSourceIndex;
    const formattedTitle = formatTitle(title);
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
          selectedSource = sources[2].multiembed[1].replace(
            "ID&tmdb=1&s=sea&e=epi",
            `${id}&tmdb=1&s=${sea}&e=${epi}`
          );
          break;
        case 3:
          selectedSource = sources[3].autoembed[1].replace(
            "ID/sea/epi",
            `${id}/${sea}/${epi}`
          );
          break;
        case 4:
          selectedSource = sources[4].vidsrc[1].replace(
            "ID&season=sea&episode=epi",
            `${id}&season=${sea}&episode=${epi}`
          );
          break;
        case 5:
          selectedSource = sources[5].moviesapi[1].replace(
            "ID-sea-epi",
            `${id}-${sea}-${epi}`
          );
          break;
        case 6:
          selectedSource = sources[6].NontonGo[1].replace(
            "ID&s=sea&e=epi",
            `${id}&s=${sea}&e=${epi}`
          );
          break;
          case 7: // For awstream TV API
          selectedSource =
            sea === 1
              ? sources[7].awstream[1].replace(
                  "title-8211-episode-01",
                  `${formattedTitle}-8211-episode-${epi}`
                )
              : sources[7].awstream[2].replace(
                  "title-season--02-8211-episode-7",
                  `${formattedTitle}-season--${sea
                    .toString()
                    .padStart(2, "0")}-8211-episode-${epi}`
                );
          break;
        default:
          selectedSource = sources[0].embedcc[1].replace(
            "ID&s=sea&e=epi",
            `${id}&s=${sea}&e=${epi}`
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
          selectedSource = sources[2].multiembed[0].replace("ID", id);
          break;
        case 3:
          selectedSource = sources[3].autoembed[0].replace("ID", id);
          break;
        case 4:
          selectedSource = sources[4].vidsrc[0].replace("ID", id);
          break;
        case 5:
          selectedSource = sources[5].moviesapi[0].replace("ID", id);
          break;
        case 6:
          selectedSource = sources[6].NontonGo[0].replace("ID", id);
          break;
        case 7: // For awstream Movie API
          selectedSource = sources[7].awstream[0].replace(
            "title-8211-episode-1",
            `${formattedTitle}-8211-episode-1`
          );
          break;
        default:
          selectedSource = sources[0].embedcc[0].replace("ID", id);
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
        <iframe
          id="dd"
          src={selectedSource}
          width="90%"
          frameBorder="0"
          scrolling="yes"
          allowFullScreen
        ></iframe>
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
