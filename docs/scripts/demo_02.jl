using Revise, TWAISWCF, SWCDatasets
df = SWCDatasets.dataset("NCUWiseLab", "TowerNCU_combined")

PT = PrepareTableDefault(df)

traintest!(PT; train_before = DateTime(2018, 11, 21), test_after = DateTime(2018, 11, 21))


using OkMakieToolkits

f = Figure();
timeseriesplot(f[1,1], x, values; testcolor=:brown2, realcolor=:blue, markersize=3)
f


# TODO:
# You should make an additional SWCForecastPlots combining PredictData, timeseriesplot, timeseriesplot! together with new method making an array of PredictData from PrepareTable.
