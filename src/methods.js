import { useState } from 'react';
import { quarterbacks as initialQuarterbacks, opponents as initialOpponents } from './data';

export const useQuarterbacks = () => {
  const [quarterbacks, setQuarterbacks] = useState([...initialQuarterbacks]);
  const [opponents, setOpponents] = useState([...initialOpponents]);
  const [scores, setScores] = useState([]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedQuarterbacks = [...quarterbacks];
    const item = updatedQuarterbacks.splice(fromIndex, 1)[0];
    updatedQuarterbacks.splice(toIndex, 0, item);
    setQuarterbacks(updatedQuarterbacks);
  };

  const calculatePoints = () => {
    const updatedQuarterbacks = quarterbacks.map((qb, index) => ({
      ...qb,
      points: 10 - index
    }));
    setQuarterbacks(updatedQuarterbacks);
  };

  const simulateWeek = () => {
    const userScore = quarterbacks.reduce((acc, qb, index) => acc + qb.points, 0);
    const opponentScores = opponents.map(opponent => {
      let score = 0;
      opponent.selections.forEach((qbName, index) => {
        const qb = quarterbacks.find(qb => qb.name === qbName);
        if (qb) {
          score += 10 - index;
        }
      });
      return { name: opponent.name, score };
    });

    // Animate tallying scores for excitement
    const animationOrder = [...opponentScores, { name: 'You', score: userScore }].sort(() => Math.random() - 0.5);

    setScores(animationOrder);
  };

  return { quarterbacks, moveItem, calculatePoints, simulateWeek, scores };
