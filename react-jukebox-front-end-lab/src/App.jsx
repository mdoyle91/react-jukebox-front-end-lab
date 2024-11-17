import { useState, useEffect } from "react";
import * as trackService from "./services/trackService.js";
import TrackList from "./components/TrackList.jsx";
import NowPlaying from "./components/NowPlaying.jsx";
import TrackForm from "./components/TrackForm.jsx";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await trackService.index();

        if (tracks.error) {
          throw new Error(tracks.error);
        }

        setTrackList(tracks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTracks();
  }, []);

  const updateSelected = (track) => {
    setSelected(track);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.error) {
        throw new Error(newTrack.error);
      }

      setTrackList([newTrack, ...trackList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId);

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }

      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );

      setTrackList(updatedTrackList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TrackList
        trackList={trackList}
        updatedSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        /> //I'm having some difficulty getting the button to render on the screen in order to add the track. I'm using the pets front-end as a reference, but am wondering if maybe I have put in too much of the code that may only be applicable to the update funcitonality (specifically, the handleFormView function or the way I've structured the terenaries). I am trying to build this bit by bit and test it along the way, so that I have a a proficient understanding of how the code functions. As I proceed, perhaps I'll isolate the issue.
      ) : (
        <NowPlaying selected={selected} handleFormView={handleFormView} />
      )}
    </>
  );
};
export default App;
