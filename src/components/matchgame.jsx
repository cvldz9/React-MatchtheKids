import React, { useState, useEffect } from 'react';
import boy1 from '../assets/boy1.svg';
import boy2 from '../assets/boy2.svg';
import boy3 from '../assets/boy3.svg';
import boy4 from '../assets/boy4.svg';
import girl1 from '../assets/girl1.svg';
import girl2 from '../assets/girl2.svg';
import girl3 from '../assets/girl3.svg';
import girl4 from '../assets/girl4.svg';

// variables for cards, flipped cards, matched cards, and moves
const MatchGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // initialize the cards
  useEffect(() => {
    const images = [boy1, boy2, boy3, boy4, girl1, girl2, girl3, girl4];
    const shuffledImages = images.concat(images).sort(() => Math.random() - 0.5);
    setCards(shuffledImages.map(image => ({ image, isFlipped: false, isMatched: false })));
  }, []);

  //logic when 2 cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];
      if (firstCard.image === secondCard.image) {
        setMatchedCards([...matchedCards, firstCardIndex, secondCardIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, i) =>
              flippedCards.includes(i) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, matchedCards, cards]);

  //logic to handle card click
  const handleCardClick = index => {
    if (!cards[index].isFlipped && !cards[index].isMatched && flippedCards.length < 2) {
      setFlippedCards(prevFlippedCards => [...prevFlippedCards, index]);
      setMoves(moves + 1);
      setCards(prevCards =>
        prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
      );
    }
  };

  // JSX rendering
  return (
    <div>
      <h1>Match the Kids</h1>
      <p>Moves: {moves}</p>
      <p>Matched Kids: {matchedCards.length / 2}</p>
      {matchedCards.length === cards.length && (
        <p style={{ fontSize: '24px', color: '#dc67ab' }}>Congratulations!!!</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: card.isFlipped || card.isMatched ? 'white' : 'lightgray',
            }}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? (
              <img
                src={card.image}
                alt="Card"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchGame;
