var documenterSearchIndex = {"docs":
[{"location":"intro/#A-TWAI-subproject-for-SWC-estimation","page":"Introduction","title":"A TWAI subproject for SWC estimation","text":"","category":"section"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"Documentation for TWAISWCF.","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"In this project, we investigate the feasibility of using the Classification and Regression Tree (CART) algorithm for estimating soil water content (SWC) using commonly available meteorological parameters.  We trained and validated CART models using data collected in a grassland terrain in northern Taiwan throughout 2018, with the goal of providing precise information for agricultural irrigation and flood risk assessment.","category":"page"},{"location":"intro/","page":"Introduction","title":"Introduction","text":"This project is funded by the National Science and Technology Council (R.O.C) through grant number MOST 110-2634-F-008-008.","category":"page"},{"location":"swcfb/","page":"SWCForecastBase","title":"SWCForecastBase","text":"CurrentModule = SWCForecastBase","category":"page"},{"location":"swcfb/#Library","page":"SWCForecastBase","title":"Library","text":"","category":"section"},{"location":"swcfb/#Index","page":"SWCForecastBase","title":"Index","text":"","category":"section"},{"location":"swcfb/","page":"SWCForecastBase","title":"SWCForecastBase","text":"","category":"page"},{"location":"swcfb/#Public-interface","page":"SWCForecastBase","title":"Public interface","text":"","category":"section"},{"location":"swcfb/","page":"SWCForecastBase","title":"SWCForecastBase","text":"Modules = [SWCForecastBase]","category":"page"},{"location":"swcfb/#SWCForecastBase._series2supervised-Tuple{Any, Any}","page":"SWCForecastBase","title":"SWCForecastBase._series2supervised","text":"series2supervised(data, range_shift, range_out)\n\nTansform a time series dataset into a supervised learning dataset.\n\nThe features will always be suffixed by an addtional time shift tag \"t-i\". Also see `splittimetag()andformattime_tag`.\n\nReferences:\n\nhttps://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.addcol_accumulation!-Tuple{Any, Any, Any}","page":"SWCForecastBase","title":"SWCForecastBase.addcol_accumulation!","text":"Add columns that are derived by accumulating corresponding variables using movingaverage.\n\nExample\n\nall_precipstr = names(df, r\"precipitation\")\n\napd = Dict( # time intervals to accumulates precipitation\n    \"1hour\" => 6,\n    \"12hour\" => 6*12,\n    \"1day\" => 6*24,\n    \"2day\" => 6*24*2,\n    \"3day\" => 6*24*3\n)\n\naddcol_accumulation!(df, all_precipstr, apd)\n\n\nSee also: movingaverage.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.cccount-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.cccount","text":"Of a time series ts, cccount(ts) calculate by default the cumulative counts of elements that approximates zero consecutively.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.chknnm-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.chknnm","text":"chknnm(df) check if DataFrame df contains missing values or NaN.     Use this before input df into machine.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.convert_types-Tuple{Any, Any}","page":"SWCForecastBase","title":"SWCForecastBase.convert_types","text":"convert_types(df, column_names_types)\n\nConverts the element type of each column to a user-specified type.\n\nArguments\n\ndf: Dataframe for which you want to convert the eltype of each column\ncolumn_names_types: Column names and target types. The type of column_names_types   should be able to be unpacked into column names and target types in a for loop.\n\nReferences\n\nhttps://discourse.julialang.org/t/how-to-change-field-names-and-types-of-a-dataframe/43991/11\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.diffsstable!-Tuple{DataFrames.DataFrame, Any, Any}","page":"SWCForecastBase","title":"SWCForecastBase.diffsstable!","text":"Of a variable of name varnm, diffsstable!(X0::DataFrame, varnm, tshift) calculates the difference between the non-shifted (suffixed by \"_t0\") and time-shifted (e.g., \"_t-6\"), where the difference is the new column for the series-to-supervised table X0.\n\nExample\n\n    (X0,) = series2supervised(...)\n    diffsstable!(X0, \"precipitation_1hr\", -6)\n\nthat creates a new column diff6_precipitation_1hr = X0[:, \"precipitation_1hr_t0\"] .- X0[:, \"precipitation_1hr_t-6\"].\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.fstree-Tuple{}","page":"SWCForecastBase","title":"SWCForecastBase.fstree","text":"Return a composite tree model with FeatureSelector.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.imputemean!-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.imputemean!","text":"imputemean!(df) substitute literal nan values with the statistical means. If all missing for a column, value 999 is imputed.\n\nNotice\n\nYou should be aware that imputemean! might does nothing without error message if the input is a view of dataframe (e.g., df[!, Not(:datetime)]).\n\nSee also islnan for literal nan.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.islnan-Tuple{AbstractString}","page":"SWCForecastBase","title":"SWCForecastBase.islnan","text":"Return true if it is literally not a number. For example, all(islnan.([\"#VALUE!\", \"nan\", \"NaN\", \"Nan\", nothing])) is true.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.islnan-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.islnan","text":"For x being the type other than the types listed above, islnan(x) falls back to isnnm(x).\n\nSee isnnm.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.isnnm-Tuple{Missing}","page":"SWCForecastBase","title":"SWCForecastBase.isnnm","text":"Check if x is missing, nothing or NaN. Different from isnan, for x being either of Nothing, Missing, DateTime, and AbstractString, islnan(x) returns true for Nothing and Missing, and returns false for the rest.\n\nThe difference between islnan and isnnm is that, isnnm check only NaN for Not-a-Number. If you input something like \"#VALUE!\", \"NaN\", it returns false (NOT missing, nothing or NaN).\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.isoutofrange-Tuple{Any, Any, Any}","page":"SWCForecastBase","title":"SWCForecastBase.isoutofrange","text":"Return true if value is out of the interval between l0 and l1. Noted that if value is missing, nothing, or literally nan (see islnan), it returns false (NOT out-of-range).\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.manytrees-Tuple{}","page":"SWCForecastBase","title":"SWCForecastBase.manytrees","text":"A random forest using EnsembleModel\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.movingaverage-Tuple{Vector{<:AbstractFloat}, Int64}","page":"SWCForecastBase","title":"SWCForecastBase.movingaverage","text":"movingaverage(v, n) returns a vector of moving averaged v by every n.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.narrow_types!-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.narrow_types!","text":"narrow_types!(df)\n\nNarrows the eltype of each column to the type that actually exists in the each column of dataframe.\n\nArguments\n\ndf: Dataframe for which you want to narrow the eltype of each column\n\nReferences\n\nhttps://discourse.julialang.org/t/how-to-change-field-names-and-types-of-a-dataframe/43991/9\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.removeunreasonables!-Tuple{Any}","page":"SWCForecastBase","title":"SWCForecastBase.removeunreasonables!","text":"removeunreasonables!(df_all) convert all column-name specific unreasonable values to missing. Noted that missing, nothing and literal nan is not \"unreasonable values\".\n\nNoted that removeunreasonables! will NOT deal with literally Not-a-Number value nor raising an error for any literally Not-a-Number value. See isoutofrange, islnan.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.series2supervised-Tuple{Vararg{Pair}}","page":"SWCForecastBase","title":"SWCForecastBase.series2supervised","text":"To transform a time series dataset into a supervised learning dataset\n\nExample\n\nA = randn(500,20)\ndf = DataFrame(A, :auto)\nX0,y0 = series_to_supervised(df[:,1:end-1], df[:,end])\nX1,y1 = series2supervised(\n    df[:,1:end-1] => range(-6, -1; step=1),\n    df[:,end] => range(0, 0; step=-1)\n    )\n\nNOTICE!\n\nThe input DataFrame (df) must have complete rows; that is, the corresponding time tag (it might be df.datetime for example) must be consecutive because df is converted to Matrix and shifted using lag.\nThis function filter the dataframe using completecases.\n\nReferences:\n\nhttps://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/\n\nTODO: write test for series2supervised, by making sure the datetime shift is correct (e.g., \"datetimet0\" should always be 1 hour ahead of \"datetimet-6\" for a 10-minute sampling data).\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.twofstree-Tuple{}","page":"SWCForecastBase","title":"SWCForecastBase.twofstree","text":"Return a composite tree model with TWO FeatureSelector: selector_1 and selector_2.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Library","title":"Library","text":"CurrentModule = TWAISWCF","category":"page"},{"location":"#Library","page":"Library","title":"Library","text":"","category":"section"},{"location":"#Index","page":"Library","title":"Index","text":"","category":"section"},{"location":"","page":"Library","title":"Library","text":"Modules = [TWAISWCF]","category":"page"},{"location":"#Public-interface","page":"Library","title":"Public interface","text":"","category":"section"},{"location":"","page":"Library","title":"Library","text":"Modules = [TWAISWCF]","category":"page"}]
}