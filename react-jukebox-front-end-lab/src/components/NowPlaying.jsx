const NowPlaying = (props) => {
  if (!props.selected)
    return (
      <div>
        <h2>NO TRACK SELECTED</h2>
      </div>
    );

  return (
    <div>
      <h1>{props.selected.title}</h1>
      <h2>Artist: {props.selected.artist}</h2>
      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
    </div>
  );
};

export default NowPlaying;
