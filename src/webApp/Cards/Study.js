import { React,useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from '../../utils/api/index';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

import PostsNav from "../PostNav"

const StudyCard = () => {
  const navigate = useNavigate(); 
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckCards, setCurCards] = useState({});
  const [deckDetails, setDeckDetails] = useState({
    id: "",
    title: "",
    description: ""
  });
  const { deckId } = useParams(); 


  useEffect(() => {
    async function fetchDeckDetails() {
      try {
        const fetchedDeckDetails = await readDeck(deckId);
        setDeckDetails({
          id: fetchedDeckDetails.id,
          title: fetchedDeckDetails.name,
          description: fetchedDeckDetails.description
        });
  
        setCurCards(fetchedDeckDetails.cards);
        
      } catch (error) {
        console.error("Error fetching deck or cards:", error);
      }
    }
    fetchDeckDetails();
  }, [deckId]);



  function handleFlip(){
    setIsFlipped(!isFlipped); //flipped : back not flipped front 
  };



  const currentCard = deckCards.length > 2 ? deckCards[currentCardIndex] : null;

  
  const handleNextCard = () => {
    setIsFlipped(false);
    if(deckCards){
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % deckCards.length);
    }

  };

  function newCard(){
    navigate(`/decks/${deckId}/cards/new`);
  }

  const getBreadcrumbs = () => {
   
    return [
      { to: "/", icon: FaHome, label: "Home" },
      { to: `/decks/${deckId}/`, label: deckDetails.title },
      { label: "Study" }
    ];
};


  return (
    <div className="container mt-5">
     <PostsNav breadcrumbs={getBreadcrumbs()} />

    <h1>Study: {deckDetails.title}</h1>
    {currentCard && (
      <div key={currentCard.id} className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{`Card ${currentCardIndex + 1} of ${deckCards.length}`}</h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleFlip}
            >
              <span className="oi" aria-hidden="true"></span> {isFlipped ? 'Flip back' : 'Flip'}
            </button> 
              {isFlipped && (
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleNextCard}
              >
                Next
              </button>
            )}
        </div>
      </div>
       )}
      {!currentCard && (
        <>
         <h2>Not enough cards.</h2>
         <p className="card-text">
           You need at least 3 cards to study. There are {deckCards.length} cards in this deck.
         </p>
          <button type="button" className="btn btn-primary mr-2" onClick={newCard}>
          <span className="oi oi-plus" aria-hidden="true"></span> Add Cards
        </button>
        </>
      )}
  </div>
 ); 
};

export default StudyCard;