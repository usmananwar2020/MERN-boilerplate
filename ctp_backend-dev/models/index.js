import { registerCascadeHooks } from './cascade.hooks.js'
import { registerAdminModel } from './admin.js'
import { registerUserModel } from './user.js'
import { registerTeamModel } from './team.js'
import { registerPlayerModel } from './player.js'
import { registerGameModel } from './game.js'
import { registerPlayerGameStatModel } from './player-game-stat.js'
import { registerOpportunityModel } from './opportunity.js'
import { registerRankingModel } from './ranking.js'
import { registerPdfUploadModel } from './pdf-upload.js'
import { registerSettingModel } from './setting.js'

let cascadesInstalled = false

/**
 * @returns {Record<string, import('mongoose').Model>}
 */
export function registerAllModels() {
  const User = registerUserModel()
  const Admin = registerAdminModel()
  const Team = registerTeamModel()
  const Player = registerPlayerModel()
  const Game = registerGameModel()
  const PlayerGameStat = registerPlayerGameStatModel()
  const Opportunity = registerOpportunityModel()
  const Ranking = registerRankingModel()
  const PdfUpload = registerPdfUploadModel()
  const Setting = registerSettingModel()

  if (!cascadesInstalled) {
    registerCascadeHooks({
      Team,
      Player,
      Game,
      PlayerGameStat,
      Ranking,
      PdfUpload,
      Admin,
    })
    cascadesInstalled = true
  }

  return {
    User,
    Admin,
    Team,
    Player,
    Game,
    PlayerGameStat,
    Opportunity,
    Ranking,
    PdfUpload,
    Setting,
  }
}

export * from './enums.js'
