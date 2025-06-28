import './DisplayCard.css'

 {/*.  image size is 300px* 160px */}
function DisplayCard() {

  return (
    <>

      <div className="card">
        <ol>
          <li>
            <img src="https://picsum.photos/300/160" alt="project image" />
          </li>
          <li>
            <h4>Norway Fjord Adventures</h4>
          </li>
          <li>
            <span>With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on 
              and around the fjords of Norway</span>
          </li>
            <li a='button-li'>
            <button>Read More</button> 
         </li>
          
          
        </ol>

      </div>




    </>
  )
}

export default DisplayCard