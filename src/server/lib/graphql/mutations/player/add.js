import {GraphQLNonNull} from 'graphql';

import{playerType, playerInputType} from '../../types/player';
import PlayerModel from '../../../models/player';

export default {
  type: playerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(playerInputType)
    }
  },
  resolve(root, params) {
  console.log("it's from server ",params.data)
    const playerModel = new PlayerModel(params.data);
    if (params.data._id == undefined) {
      var newPlayer = playerModel.save();
    } else {
      var newPlayer = playerModel.init(params.data, {}, function() {
        playerModel.save()
    });
    }

    if(!newPlayer) {
      throw new Error('Cannot create new Player');
    }
    return newPlayer;
  }
};