import "./DisplayCard.css";

{
  /*.  image size is 300px* 160px */
}
function DisplayCard() {
  return (
    <>
      <div className="card">
        <img src="https://picsum.photos/300/160" alt="project image" />

        <div id="text-infomation">
          <h4>Norway Fjord Adventures</h4>

          <p>
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </p>

          <button>Read More</button>
        </div>
      </div>
    </>
  );
}

export default DisplayCard;
