import { React,useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { readDeck,updateDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import PostsNav from "../PostNav"

function EditCard() {
    const navigate = useNavigate(); 
    const { deckId } = useParams(); 
    const [ deckDetails, setDeckDetails ] = useState({
        id: "",
        name: "",
        description: ""
      });
      
    useEffect(() => {
        async function fetchDeckDetails() {
            try {
                const curDeck = await readDeck(deckId);
                setDeckDetails(curDeck);

            } catch (error) {
                console.error("Error fetching deck or cards:", error);
            }
        }
        fetchDeckDetails();
    }, [deckId]);

    async function handleSubmit(e){
         e.preventDefault();
         const updatedDeck = {
            id: deckId,
            name: deckDetails.name,
            description: deckDetails.description
          }
          console.log(updatedDeck);
          const cardData = await updateDeck(updatedDeck);
          navigate(`/decks/${cardData.id}`);
    }

 function handleChange(e){
    const {name , value} = e.target;
    setDeckDetails(prevVal => ({
        ...prevVal,
        [name] : value
    }));}

  const getBreadcrumbs = () => {
  
    return [
      { to: "/", icon: FaHome, label: "Home" },
      { to: `/decks/${deckId}/`, label: deckDetails.name },
      { label: "Edit" }
    ];
};

  return (
    <div className="container mt-5">
    <PostsNav breadcrumbs={getBreadcrumbs()} />
    <h3>Edit Deck</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={deckDetails.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={deckDetails.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="d-flex">
        <Link to="/" className="btn btn-secondary mr-2">
          <span className="oi oi-circle-x" aria-hidden="true"></span> Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          <span className="oi oi-circle-check" aria-hidden="true"></span> Submit
        </button>
      </div>
    </form>
  </div>
  );
}

export default EditCard;