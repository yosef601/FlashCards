import {React, useState} from "react";
import {createDeck} from '../../utils/api/index';
import { useNavigate } from "react-router-dom";

function CreateDeck() {
const navigate = useNavigate(); 
const [formState, setFormState] = useState({
    deckName: "",
    description: ""
  });


 function handleChange(e){
    const {name , value} = e.target;
    setFormState(prevVal => ({
        ...prevVal,
        [name] : value
    }));
 }
 async function handleSubmit(e){
    e.preventDefault();
    const deck = {
      "name": formState.deckName,
      "description": formState.description
    }
    const cardData = await createDeck(deck);
    navigate(`/decks/${cardData.id}`);
  }

  const cancel = () => {
    setFormState({
        deckName: "",
        description: ""
    });
    navigate("/");
  };

  
  return (
        <div className="container mt-4">
          <h2>Create Deck</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="deckName">Name</label>
              <input
                type="text"
                className="form-control"
                id="deckName"
                name="deckName"
                placeholder="DeckName"
                value={formState.deckName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="description"
                value={formState.description}
                onChange={handleChange}             
             ></textarea>
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={cancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
}

export default CreateDeck;