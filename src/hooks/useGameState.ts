'use client';

import { useState, useCallback } from 'react';
import {
  GameState,
  Player,
  DeckType,
  Card,
  Stake,
  StakeType,
  RoundResult
} from '@/types/game';
import {
  createDeck,
  getAllStakes,
  determineWinner,
  createStake
} from '@/lib/game-data';

// 初始化游戏状态
const initialGameState: GameState = {
  status: 'not_started',
  round: 0,
  user: {
    type: 'user',
    deck: null,
    stakes: getAllStakes(),
    selectedCard: null
  },
  npc: {
    type: 'npc',
    deck: null,
    stakes: getAllStakes(),
    selectedCard: null
  },
  currentStake: null,
  roundResult: null,
  gameResult: null,
  message: '欢迎来到皇帝与奴隶卡牌对战游戏'
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // 开始新游戏
  const startNewGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      status: 'choosing_deck',
      message: '请选择你要使用的卡牌：皇帝牌组或奴隶牌组'
    });
  }, []);

  // 选择牌组
  const chooseDeck = useCallback((deckType: DeckType) => {
    const userDeck = createDeck(deckType);
    const npcDeck = createDeck(deckType === 'emperor' ? 'slave' : 'emperor');

    setGameState(prev => ({
      ...prev,
      status: 'choosing_stake',
      user: {
        ...prev.user,
        deck: userDeck
      },
      npc: {
        ...prev.npc,
        deck: npcDeck
      },
      message: '请选择本局游戏的筹码'
    }));
  }, []);

  // 选择筹码
  const chooseStake = useCallback((stakeType: StakeType) => {
    const stake = gameState.user.stakes.find(s => s.type === stakeType);

    if (!stake) return;

    setGameState(prev => ({
      ...prev,
      status: 'playing',
      currentStake: stake,
      message: stake.type === 'life'
        ? '你选择了生命作为筹码，这局将决定游戏胜负！请选择一张卡牌出战'
        : '请从你的牌组中选择一张卡牌出战'
    }));
  }, [gameState.user.stakes]);

  // 玩家选择卡牌
  const selectCard = useCallback((card: Card) => {
    if (gameState.status !== 'playing') return;

    // 随机选择NPC的卡牌
    const npcDeck = gameState.npc.deck;
    if (!npcDeck) return;

    const randomIndex = Math.floor(Math.random() * npcDeck.cards.length);
    const npcCard = npcDeck.cards[randomIndex];

    // 从各自的牌组中移除已选卡牌
    const updatedUserDeck = gameState.user.deck ? {
      ...gameState.user.deck,
      cards: gameState.user.deck.cards.filter(c => c.id !== card.id)
    } : null;

    const updatedNpcDeck = {
      ...npcDeck,
      cards: npcDeck.cards.filter(c => c.id !== npcCard.id)
    };

    // 判断对局结果
    const result = determineWinner(card, npcCard) as RoundResult;

    setGameState(prev => ({
      ...prev,
      status: 'round_result',
      round: prev.round + 1,
      user: {
        ...prev.user,
        deck: updatedUserDeck,
        selectedCard: card
      },
      npc: {
        ...prev.npc,
        deck: updatedNpcDeck,
        selectedCard: npcCard
      },
      roundResult: result,
      message: getResultMessage(result, card, npcCard)
    }));

    // 延迟处理回合结果
    setTimeout(() => {
      handleRoundResult(result);
    }, 2000);
  }, [gameState]);

  // 处理回合结果
  const handleRoundResult = useCallback((result: RoundResult) => {
    if (result === 'draw') {
      // 平局，继续游戏
      setGameState(prev => ({
        ...prev,
        status: 'playing',
        user: {
          ...prev.user,
          selectedCard: null
        },
        npc: {
          ...prev.npc,
          selectedCard: null
        },
        roundResult: null,
        message: '平局！请继续选择一张卡牌出战'
      }));
    } else {
      // 有胜负，处理输赢
      const winner = result === 'user_win' ? 'user' : 'npc';
      const loser = result === 'user_win' ? 'npc' : 'user';

      // 如果筹码是生命，直接结束游戏
      if (gameState.currentStake?.type === 'life') {
        setGameState(prev => ({
          ...prev,
          status: 'game_over',
          gameResult: winner === 'user' ? 'user_win' : 'npc_win',
          message: winner === 'user'
            ? '你赢了！你赢得了游戏！'
            : '你输了！游戏结束！'
        }));
        return;
      }

      // 否则，扣除失败方的筹码
      if (gameState.currentStake) {
        const currentStakeType = gameState.currentStake.type;

        setGameState(prev => {
          const updatedLoserStakes = prev[loser as 'user' | 'npc'].stakes.filter(
            stake => stake.type !== currentStakeType
          );

          // 如果输家没有筹码了，游戏结束
          if (updatedLoserStakes.length === 0) {
            return {
              ...prev,
              status: 'final_chance',
              [loser]: {
                ...prev[loser as 'user' | 'npc'],
                stakes: updatedLoserStakes
              },
              message: loser === 'user'
                ? '你输掉了所有筹码！你想要进行最后的翻盘机会吗？'
                : 'NPC输掉了所有筹码！NPC想要进行最后的翻盘机会。'
            };
          }

          // 否则继续游戏
          return {
            ...prev,
            status: 'choosing_stake',
            user: {
              ...prev.user,
              selectedCard: null,
              stakes: loser === 'user' ? updatedLoserStakes : prev.user.stakes
            },
            npc: {
              ...prev.npc,
              selectedCard: null,
              stakes: loser === 'npc' ? updatedLoserStakes : prev.npc.stakes
            },
            currentStake: null,
            roundResult: null,
            message: '请选择下一局游戏的筹码'
          };
        });
      }
    }
  }, [gameState.currentStake]);

  // 最后的翻盘机会
  const makeFinalChance = useCallback((choice: 'accept' | 'challenge') => {
    if (gameState.status !== 'final_chance') return;

    if (choice === 'accept') {
      // 接受结局
      setGameState(prev => ({
        ...prev,
        status: 'game_over',
        gameResult: prev.roundResult === 'user_win' ? 'user_win' : 'npc_win',
        message: prev.roundResult === 'user_win'
          ? '你赢了！你赢得了游戏！'
          : '你输了！游戏结束！'
      }));
    } else {
      // 挑战最后一局
      const userDeck = gameState.user.deck;
      const npcDeck = gameState.npc.deck;

      if (!userDeck || !npcDeck) return;

      setGameState(prev => ({
        ...prev,
        status: 'playing',
        currentStake: createStake('life'),
        message: '这是最后的翻盘机会，生死局！请选择一张卡牌出战'
      }));
    }
  }, [gameState.status, gameState.roundResult]);

  // NPC选择是否进行最后的翻盘机会
  const npcMakeFinalChance = useCallback(() => {
    // 50%的概率选择挑战
    const willChallenge = Math.random() > 0.5;

    if (willChallenge) {
      makeFinalChance('challenge');
    } else {
      makeFinalChance('accept');
    }
  }, [makeFinalChance]);

  // 获取结果消息
  const getResultMessage = (result: RoundResult, userCard: Card, npcCard: Card) => {
    if (result === 'draw') {
      return `平局！你出了${userCard.name}，NPC出了${npcCard.name}`;
    } else if (result === 'user_win') {
      return `你赢了！你的${userCard.name}击败了NPC的${npcCard.name}`;
    } else {
      return `你输了！你的${userCard.name}被NPC的${npcCard.name}击败了`;
    }
  };

  return {
    gameState,
    startNewGame,
    chooseDeck,
    chooseStake,
    selectCard,
    makeFinalChance,
    npcMakeFinalChance
  };
};
