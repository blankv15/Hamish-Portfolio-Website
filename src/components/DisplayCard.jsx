import "./DisplayCard.css";

{
  /*.  image size is 300px* 160px */
}
function DisplayCard({props}) {
  return (
    <>
      <div className="card">
        <img src={props.image_url} alt="project image" />

        <div id="title">
          <h4>{props.title}</h4>

          <p>
           {props.description}
          </p>
          <button>{props.buttonText}</button>
        </div>
      </div>
    </>
  );
}

export default DisplayCard;
