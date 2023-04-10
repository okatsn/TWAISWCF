module TWAISWCF
using Dates
export DateTime


using SWCForecastBase
export PrepareTable, PrepareTableDefault, preparetable!, ConfigAccumulate, ConfigPreprocess, ConfigSeriesToSupervised
export traintest!, train!, test!, save

using CairoMakie, OkMakieToolkits
PredictData(PT::PredictTable, i) = PredictData(
    PT.cache.test.args.Y_pred,
    PT.cache.test.args.Y_real,
    i)

export PredictData, timeseriesplot, timeseriesplot!
# import SWCForecastBase: TrainTestState
# export TrainTestState


end
