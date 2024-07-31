import { React,useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { readCard,updateCard,readDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import PostsNav from "../PostNav"
import CardForm from "./Card";

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

                const Deck = await readDeck(deckId);
                setDeckdDetails(Deck);

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
    <CardForm
      card={cardDetails}
      onChange={handleChange}
      onSubmit={onSubmit}
      breadcrumbs={getBreadcrumbs()}
      title="Edit Card"
      submitButtonText="Submit"
      cancelLink={`/decks/${deckId}`}
    />
  );

}

export default EditCard;