import { Card, CardType, Deck, DeckType, Stake, StakeType } from '@/types/game';
import { v4 as uuidv4 } from 'uuid';

// 创建一张卡牌
export const createCard = (type: CardType): Card => {
  const nameMap: Record<CardType, string> = {
    emperor: '皇帝',
    slave: '奴隶',
    citizen: '平民'
  };

  const descriptionMap: Record<CardType, string> = {
    emperor: '可以战胜平民，但会被奴隶击败',
    slave: '可以战胜皇帝，但会被平民击败',
    citizen: '可以战胜奴隶，但会被皇帝击败'
  };

  return {
    id: uuidv4(),
    type,
    name: nameMap[type],
    description: descriptionMap[type]
  };
};

// 创建牌组
export const createDeck = (type: DeckType): Deck => {
  const cards: Card[] = [];

  if (type === 'emperor') {
    // 皇帝牌组: 1张皇帝牌 + 4张平民牌
    cards.push(createCard('emperor'));
    for (let i = 0; i < 4; i++) {
      cards.push(createCard('citizen'));
    }
  } else {
    // 奴隶牌组: 1张奴隶牌 + 4张平民牌
    cards.push(createCard('slave'));
    for (let i = 0; i < 4; i++) {
      cards.push(createCard('citizen'));
    }
  }

  return {
    type,
    cards
  };
};

// 创建筹码
export const createStake = (type: StakeType): Stake => {
  const stakeMap: Record<StakeType, { name: string; description: string; value: number }> = {
    gold: {
      name: '10W金币',
      description: '失去后还有机会获得其他筹码',
      value: 100000
    },
    house: {
      name: '房子',
      description: '失去后还有机会获得其他筹码',
      value: 1000000
    },
    labor: {
      name: '卖身打工',
      description: '失去后还有机会获得其他筹码',
      value: 50000
    },
    life: {
      name: '生命',
      description: '一局定胜负，输了就彻底结束',
      value: 9999999
    }
  };

  return {
    type,
    name: stakeMap[type].name,
    description: stakeMap[type].description,
    value: stakeMap[type].value
  };
};

// 获取所有可用的筹码
export const getAllStakes = (): Stake[] => {
  return ['gold', 'house', 'labor', 'life'].map(type => createStake(type as StakeType));
};

// 判断对局胜负
export const determineWinner = (userCard: Card, npcCard: Card) => {
  if (userCard.type === npcCard.type) {
    return 'draw';
  }

  if (
    (userCard.type === 'emperor' && npcCard.type === 'citizen') ||
    (userCard.type === 'citizen' && npcCard.type === 'slave') ||
    (userCard.type === 'slave' && npcCard.type === 'emperor')
  ) {
    return 'user_win';
  }

  return 'npc_win';
};
