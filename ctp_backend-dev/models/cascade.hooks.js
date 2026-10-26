export function registerCascadeHooks({ Team, Player, Game, PlayerGameStat, Ranking, PdfUpload, Admin }) {
  Team.schema.pre('deleteOne', { document: true, query: false }, async function () {
    const tid = this._id
    const players = await Player.find({ team_id: tid }).select('_id').lean()
    const games = await Game.find({ team_id: tid }).select('_id').lean()
    const pids = players.map((p) => p._id)
    const gids = games.map((g) => g._id)

    await PlayerGameStat.deleteMany({
      $or: [{ player_id: { $in: pids } }, { game_id: { $in: gids } }],
    })
    await Player.deleteMany({ team_id: tid })
    await Game.deleteMany({ team_id: tid })
    await Ranking.deleteMany({ team_id: tid })
  })

  Player.schema.pre('deleteOne', { document: true, query: false }, async function () {
    const pid = this._id
    await PlayerGameStat.deleteMany({ player_id: pid })
    await Ranking.deleteMany({ player_id: pid })
  })

  Game.schema.pre('deleteOne', { document: true, query: false }, async function () {
    await PlayerGameStat.deleteMany({ game_id: this._id })
  })

  Admin.schema.pre('deleteOne', { document: true, query: false }, async function () {
    await PdfUpload.updateMany(
      { uploaded_by_admin_id: this._id },
      { $set: { uploaded_by_admin_id: null } }
    )
  })
}
