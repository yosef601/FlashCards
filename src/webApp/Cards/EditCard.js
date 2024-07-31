import { React,useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { readCard,updateCard,readDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import PostsNav from "../PostNav"

function EditCard() {
    const navigate = useNavigate(); 
    const { deckId, cardId } = useParams();
    const [ cardDetails, setCardDetails ] = useState({
        id: "",
        front: "",
        back: "",
        deckId: ""
      });
  const [ deckdDetails, setDeckdDetails ] = useState({});

    useEffect(() => {
        async function fetchDeckDetails() {
            try {
                const curCard = await readCard(cardId);
                setCardDetails(curCard);

                //const Deck = await readDeck(deckId);
                setDeckdDetails(curCard);

            } catch (error) {
                console.error("Error fetching deck or cards:", error);
            }
        }
        fetchDeckDetails();
    }, [deckId]);

    async function onSubmit(e){
         e.preventDefault();
         const updatedCard = {
            id: cardDetails.id,
            front: cardDetails.front,
            back: cardDetails.back,
            deckId: cardDetails.deckId
          }
          const cardData = await updateCard(updatedCard);
          navigate(`/decks/${cardData.deckId}`);
    }

    function handleChange(e){
        const {name , value} = e.target;
        setCardDetails(prevVal => ({
            ...prevVal,
            [name] : value
        }));}

    const getBreadcrumbs = () => {

      return [
        { to: "/", icon: FaHome, label: "Home" },
        { to: `/decks/${deckId}/`, label: deckdDetails.name},
        { label: `Edit Card ${cardDetails.id}` }
      ];
  };

  return (
    <div className="container mt-5">
     <PostsNav breadcrumbs={getBreadcrumbs()} />
      <h3>Edit Card</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            value={cardDetails.front}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            value={cardDetails.back}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="d-flex">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
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