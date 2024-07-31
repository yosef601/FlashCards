import { React,useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck,deleteDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import  Card  from "../Cards/CardOnDeck";
import PostsNav from "../PostNav"


function Deck() {
  const [curDeck, setCurDeck] = useState({});
  const navigate = useNavigate(); 
  const { deckId } = useParams(); 
  const [deckDetails, setDeckDetails] = useState({
    id: "",
    title: "",
    description: ""
  });

  useEffect(() => {
    async function fetchDeckDetails() {
      try {
        const fetchedDeckDetails = await getDeckDetails(deckId);
        setDeckDetails({
          id: fetchedDeckDetails.id,
          title: fetchedDeckDetails.name,  
          description: fetchedDeckDetails.description
        });

        //const curDeck = await readDeck(deckId);
        setCurDeck(fetchedDeckDetails);
        console.log(curDeck.cards);

      } catch (error) {
        console.error("Error fetching deck or cards:", error);
      }
    }
    fetchDeckDetails();
  }, [deckId]);

  ///remove V
  async function getDeckDetails(deckIdDetail){
    const deckDetails = await readDeck(deckIdDetail);
    return deckDetails;
  }

  function newCard(){
    navigate(`/decks/${deckId}/cards/new`);
  }

  function study(){
    navigate(`/decks/${deckId}/study`);
  }

  function edit(){
    navigate(`/decks/${deckId}/edit`);
  }

  async function del() {
      if (window.confirm("Are you sure you want to delete this Deck?")) {
        await deleteDeck(deckId);
        navigate("/");
      } else {
        console.log("Delete action canceled");
      }
  }

  const getBreadcrumbs = () => {
   
        return [
          { to: "/", icon: FaHome, label: "Home" },
          { label: `${curDeck.name}` }
        ];
  };

  
  return (
    <div>
      <PostsNav breadcrumbs={getBreadcrumbs()} />
      <div className="card-body">
      <h5 className="card-title">{deckDetails.title}</h5>
        <p className="card-text">{deckDetails.description}</p>
        <div className="d-flex">
          <button type="button" className="btn btn-secondary mr-2" onClick={edit}>
            <span className="oi oi-pencil" aria-hidden="true"></span> Edit
          </button>
          <button type="button" className="btn btn-primary mr-2" onClick={study}>
            <span className="oi oi-book" aria-hidden="true"></span> Study
          </button>
          <button type="button" className="btn btn-primary mr-2" onClick={newCard}>
            <span className="oi oi-plus" aria-hidden="true"></span> Add Cards
          </button>
          <button type="button" className="btn btn-danger ml-auto" onClick={del}>
            <span className="oi oi-trash" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div className="mt-3">
          {curDeck.cards && curDeck.cards.map((card) => (
            <Card key={card.id} cardId={card.id} deckId={deckId} back={card.back} front={card.front} />
          ))}
      </div>
    </div>
  );
};

export default Deck;
