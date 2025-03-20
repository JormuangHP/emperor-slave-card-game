// 卡牌类型
export type CardType = 'emperor' | 'slave' | 'citizen';

// 卡牌接口
export interface Card {
  id: string;
  type: CardType;
  name: string;
  description: string;
}

// 牌组类型
export type DeckType = 'emperor' | 'slave';

// 牌组接口
export interface Deck {
  type: DeckType;
  cards: Card[];
}

// 筹码类型
export type StakeType = 'gold' | 'house' | 'labor' | 'life';

// 筹码接口
export interface Stake {
  type: StakeType;
  name: string;
  description: string;
  value: number;
}

// 玩家类型 (用户或NPC)
export type PlayerType = 'user' | 'npc';

// 玩家接口
export interface Player {
  type: PlayerType;
  deck: Deck | null;
  stakes: Stake[];
  selectedCard: Card | null;
}

// 游戏状态
export type GameStatus = 'not_started' | 'choosing_deck' | 'choosing_stake' | 'playing' | 'round_result' | 'game_over' | 'final_chance';

// 回合结果
export type RoundResult = 'draw' | 'user_win' | 'npc_win';

// 游戏状态接口
export interface GameState {
  status: GameStatus;
  round: number;
  user: Player;
  npc: Player;
  currentStake: Stake | null;
  roundResult: RoundResult | null;
  gameResult: 'user_win' | 'npc_win' | null;
  message: string;
}
