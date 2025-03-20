'use client';

import { useGameState } from "@/hooks/useGameState";
import { Card as CardType } from "@/types/game";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import StartScreen from "@/components/StartScreen";
import DeckSelectionScreen from "@/components/DeckSelectionScreen";
import StakeSelectionScreen from "@/components/StakeSelectionScreen";
import GamePlayScreen from "@/components/GamePlayScreen";
import RoundResultScreen from "@/components/RoundResultScreen";
import FinalChanceScreen from "@/components/FinalChanceScreen";
import GameOverScreen from "@/components/GameOverScreen";

export default function GameContainer() {
  const {
    gameState,
    startNewGame,
    chooseDeck,
    chooseStake,
    selectCard,
    makeFinalChance,
    npcMakeFinalChance
  } = useGameState();

  // 根据游戏状态渲染不同的屏幕
  const renderGameScreen = () => {
    switch (gameState.status) {
      case 'not_started':
        return <StartScreen onStart={startNewGame} />;

      case 'choosing_deck':
        return <DeckSelectionScreen onSelectDeck={chooseDeck} />;

      case 'choosing_stake':
        return (
          <StakeSelectionScreen
            stakes={gameState.user.stakes}
            onSelectStake={chooseStake}
          />
        );

      case 'playing':
        return (
          <GamePlayScreen
            userDeck={gameState.user.deck?.cards || []}
            onSelectCard={selectCard as (card: CardType) => void}
            currentStake={gameState.currentStake}
            round={gameState.round}
          />
        );

      case 'round_result':
        return (
          <RoundResultScreen
            userCard={gameState.user.selectedCard}
            npcCard={gameState.npc.selectedCard}
            result={gameState.roundResult}
          />
        );

      case 'final_chance':
        const isUserChance = gameState.user.stakes.length === 0;

        if (isUserChance) {
          return (
            <FinalChanceScreen
              onAccept={() => makeFinalChance('accept')}
              onChallenge={() => makeFinalChance('challenge')}
            />
          );
        } else {
          // NPC的最后机会，自动处理
          setTimeout(() => {
            npcMakeFinalChance();
          }, 2000);

          return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <h2 className="text-2xl font-bold">NPC正在决定是否挑战...</h2>
            </div>
          );
        }

      case 'game_over':
        return (
          <GameOverScreen
            result={gameState.gameResult}
            onPlayAgain={startNewGame}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-orange-600 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">皇帝与奴隶</h1>
          <p className="text-sm opacity-80">卡牌对战游戏</p>
        </div>

        <div className="p-6">
          <div className="mb-4 bg-orange-100 rounded-lg p-4 text-orange-800">
            {gameState.message}
          </div>

          {renderGameScreen()}
        </div>
      </div>
    </div>
  );
}
