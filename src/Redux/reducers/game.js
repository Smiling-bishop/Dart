import makeModule from '../helper';

const initialPlayerState = (count, mode) => ({
  name: `Player ${count}`,
  score: mode,
  historic: [],
});

const initialState = {
  players: [{...initialPlayerState(1, 301)}],
  mode: 301,
};

const handlers = {
  addPlayer: (state) => {
    const players = [
      ...state.players,
      {...initialPlayerState(state.players.length + 1, state.mode)},
    ];
    return {
      ...state,
      players,
    };
  },
  changePlayerName: (state, {id, name}) => {
    let players = [...state.players];
    players[id].name = name;
    return {
      ...state,
      players,
    };
  },
  changePlayersMode: (state, mode) => {
    let players = [...state.players];
    for (let i = 0; i < players.length; ++i) {
      players[i].score = mode;
    }
    console.log(players);
    return {...state, players, mode};
  },
  addScore: (state, {id, score, round}) => {
    let players = [...state.players];
    const tmp = players[id].score - score;
    if (tmp >= 0) {
      players[id].score -= score;
    }
    players[id].historic.push(round);
    return {...state};
  },
  restartGame: (state) => {
    let players = [...state.players];
    players = players.map((player) => ({
      ...player,
      historic: [],
      score: state.mode,
    }));
    return {
      ...state,
      players,
    };
  },
};

const handlersAsync = {};

const {reducer, actions} = makeModule(
  'game',
  initialState,
  handlers,
  handlersAsync,
);

export default reducer;
export {actions};
