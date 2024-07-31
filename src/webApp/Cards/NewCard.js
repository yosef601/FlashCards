import { React,useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { createCard,readDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import CardForm from "./Card";

function NewCard() {
const navigate = useNavigate(); 
  const { deckId } = useParams(); 
  const [deckDetails, setDeckDetails] = useState({
    id: "",
    title: "",
    description: ""
  });

  const [card, setCard] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    async function fetchDeckDetails() {
      const fetchedDeckDetails = await getDeckDetails(deckId);
      setDeckDetails({
        id: fetchedDeckDetails.id,
        title: fetchedDeckDetails.name,  
        description: fetchedDeckDetails.description
      });
    }

    fetchDeckDetails();
  }, [deckId]);

  async function getDeckDetails(deckIdDetail){
    const deckDetails = await readDeck(deckIdDetail);
    return deckDetails;
  }


  async function createNewCard(e){
    e.preventDefault();
    const newCard = {
        front:card.front,
        back: card.back,
    }
    await createCard(deckId , newCard);
    setCard({
        front: "",
        back: "",
    });
  }

  function onChange(e){
    const { name , value } = e.target;
    setCard(cardDetails => ({
        ...cardDetails,
        [name]: value
    }));
  }

  function Done(){
    navigate(`/decks/${deckId}`);
  }

  const getBreadcrumbs = () => {

    return [
      { to: "/", icon: FaHome, label: "Home" },
      { to: `/decks/${deckId}/`, label: deckDetails.title},
      { label: "Add Card" }
    ];
};

return (
  <CardForm
    card={card}
    onChange={onChange}
    onSubmit={createNewCard}
    breadcrumbs={getBreadcrumbs()}
    title="Add Card"
    submitButtonText="Save"
    cancelLink={`/decks/${deckId}`}
  />
);

  // return (
  //   <div className="container mt-5">
  //   <PostsNav breadcrumbs={getBreadcrumbs()} />
  //     <h5 className="card-title">{deckDetails.title}: Add Card</h5>
  //     <form onSubmit={createNewCard}>
  //       <div className="form-group">
  //         <label htmlFor="front">Front</label>
  //         <textarea
  //           className="form-control"
  //           id="front"
  //           rows="3"
  //           placeholder="Front side of card"
  //           name="front"
  //           value={card.front}
  //           onChange={onChange}        
  //         ></textarea>
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="back">Back</label>
  //         <textarea
  //           className="form-control"
  //           id="back"
  //           rows="3"
  //           placeholder="Back side of card"
  //           name="back"
  //           value={card.back}
  //           onChange={onChange}        
  //         ></textarea>
  //       </div>
  //       <div className="d-flex">
  //         <button type="button" className="btn btn-secondary mr-2" onClick={Done}>
  //           <span className="oi oi-circle-x" aria-hidden="true"></span> Done
  //         </button>
  //         <button type="submit" className="btn btn-primary">
  //           <span className="oi oi-circle-check" aria-hidden="true"></span> Save
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
}

export default NewCard;
