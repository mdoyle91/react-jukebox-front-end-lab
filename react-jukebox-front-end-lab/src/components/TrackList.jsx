const TrackList = (props) => {
  const tracks = props.trackList.map((track) => (
    <a key={track._id} onClick={() => props.updateSelected(track)}>
      <li key={track._id}>{track.title}</li>
    </a>
  ));
  return (
    <div>
      <h1>Track List</h1>;
      {!props.trackList.length ? <h2>No Tracks Yet!</h2> : <ul>{tracks}</ul>}
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? "Close From" : "New Track"}{" "}
        {/* I think this is the part I was missing before and why I couldn't get the add button to render. I just didn't have a button here. */}
      </button>
    </div>
  );
};

export default TrackList;
