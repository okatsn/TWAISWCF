var documenterSearchIndex = {"docs":
[{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"CurrentModule = TWAISWCF","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"using TWAISWCF, SWCExampleDatasets","category":"page"},{"location":"preptab/#An-Exemplary-Workflow","page":"Prepare the Table","title":"An Exemplary Workflow","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"Outline","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"PrepareTable is an mutable structure with its field pointing to the source data, configurations, models and train-test results \nits contents can be changed by train!, test! or traintest!\nPrepareTable by default use regular expression for sorting and partitioning the input table; see the Configuration for more detailed information.","category":"page"},{"location":"preptab/#Load-an-dataset","page":"Prepare the Table","title":"Load an dataset","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"List available datasets from SWCExampleDatasets:","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"using SWCExampleDatasets\nSWCExampleDatasets.datasets()","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"Load one as DataFrame:","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"df = SWCExampleDatasets.dataset(\"NCUWiseLab\", \"ARI_G2F820_example\")\ndf[1:5,:] # hide","category":"page"},{"location":"preptab/#Create-the-PrepareTable-object","page":"Prepare the Table","title":"Create the PrepareTable object","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"Use PrepareTableDefault to create an PrepareTable with default configurations:","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"PrepareTableDefault","category":"page"},{"location":"preptab/#SWCForecastBase.PrepareTableDefault","page":"Prepare the Table","title":"SWCForecastBase.PrepareTableDefault","text":"Default data processing:\n\nPrepareTableDefault(df::DataFrame) = PrepareTable(df, ConfigPreprocess(), ConfigAccumulate(), ConfigSeriesToSupervised())\n\n\n\n\n\n","category":"function"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"or use PrepareTable for general purposes.","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"PrepareTable","category":"page"},{"location":"preptab/#SWCForecastBase.PrepareTable","page":"Prepare the Table","title":"SWCForecastBase.PrepareTable","text":"Constructor\n\nPrepareTable(table) = new(table, PrepareTableConfig[])\n\nField\n\ntable::DataFrame\nconfigs::Vector{<:PrepareTableConfig}\nstatus::Union{TrainTestState, Nothing}\nsupervised_tables::Union{SeriesToSupervised, Nothing}\ncache::Cache\n\nExample\n\n    PrepareTable(df::DataFrame, ConfigPreprocess(), ConfigAccumulate(), ConfigSeriesToSupervised())\n\nis equivalently\n\n    DefaultPrepareTable(df)\n\nAnother example\n\nPrepareTable(df,\n    ConfigPreprocess(;target_features=Cols(r\"soil_water_content_10cm\")),\n    ConfigAccumulate(),\n    ConfigSeriesToSupervised(; shift_x=[0, -2])\n)\n\nSee also DefaultPrepareTable.\n\n\n\n\n\n","category":"type"},{"location":"preptab/#Configuration","page":"Prepare the Table","title":"Configuration","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"Currently available configurations:","category":"page"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"ConfigAccumulate\nConfigPreprocess\nConfigSeriesToSupervised","category":"page"},{"location":"preptab/#SWCForecastBase.ConfigAccumulate","page":"Prepare the Table","title":"SWCForecastBase.ConfigAccumulate","text":"ConfigAccumulate generate derived variables as the new columns, by accumulating each variable in variables for every interval in each intervals.\n\nUse keyword arguments to construct the object.\n\nExample\n\nConfigAccumulate(; variables = Cols(:precipitation_max),\n                                intervals = [1, 12, 24, 48, 36],\n                                unit = \"hr\"\n        )\n\nvariables: Cols column selector for selecting columns (variables) to be derived.\nintervals: the window length for accumulating an variable.\nunit: unit of intervals as appended string of the new column, e.g., day.\n\n\n\n\n\n","category":"type"},{"location":"preptab/#SWCForecastBase.ConfigPreprocess","page":"Prepare the Table","title":"SWCForecastBase.ConfigPreprocess","text":"ConfigPreprocess controls the primary feature selection and how the data being preprocessed before training.\n\nUse keyword arguments to construct the object.\n\nExample\n\nConfigPreprocess(;\n        timeargs = Cols(:year, :month, :day, :hour),\n        input_features  = Cols(r\"air_temp\", r\"humidity\", r\"pressure\", r\"windspeed\", r\"precipitation\"),\n        target_features = Cols(r\"soil_water_content\"),\n        preprocessing   = [take_hour_last, removeunreasonables!, imputeinterp!, disallowmissing!, precipmax!],\n        )\n\n\n\n\n\n","category":"type"},{"location":"preptab/#SWCForecastBase.ConfigSeriesToSupervised","page":"Prepare the Table","title":"SWCForecastBase.ConfigSeriesToSupervised","text":"ConfigSeriesToSupervised controls how the data being shifted; it is for preparing the data for supervised model training.\n\nUse keyword arguments to construct the object.\n\nExample\n\nConfigSeriesToSupervised(;\n        shift_x         = [0, -6, -12, -24, -36, -48, -60, -72],\n        shift_y         = [1],\n        )\n\nshift_x: the time shift for the data using as the input features\nshift_y: the time shift for the data using as the target features\n\n\n\n\n\n","category":"type"},{"location":"preptab/#Manipulate","page":"Prepare the Table","title":"Manipulate","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"preparetable!","category":"page"},{"location":"preptab/#SWCForecastBase.preparetable!","page":"Prepare the Table","title":"SWCForecastBase.preparetable!","text":"preparetable!(PT::PrepareTable, PTC::ConfigPreprocess) generates datetime column by PTC.timeargs, sort! by :datetime, do PTC.preprocessing in @chain and check if the table is continuous in time.\n\nnote: Note\nThis method will raise essential error, that PTC::ConfigPreprocess should be the first arg in args of PrepareTable(PT, args...). Otherwise, the succeeding processing such as ConfigAccumulate or ConfigSeriesToSupervised may give incorrect results without error.\n\n\n\n\n\npreparetable!(PT::PrepareTable, PTC::ConfigAccumulate) generates derived variables as new columns. See ConfigAccumulate.\n\n\n\n\n\npreparetable!(PT::PrepareTable, PTC::ConfigSeriesToSupervised) creates SeriesToSupervised as PT.supervised_tables for training and testing for supervised models.\n\n\n\n\n\n","category":"function"},{"location":"preptab/#Status-in-each-step","page":"Prepare the Table","title":"Status in each step","text":"","category":"section"},{"location":"preptab/","page":"Prepare the Table","title":"Prepare the Table","text":"SWCForecastBase.TrainTestState","category":"page"},{"location":"preptab/#SWCForecastBase.TrainTestState","page":"Prepare the Table","title":"SWCForecastBase.TrainTestState","text":"TrainTestState is an abstract type of Prepare, Train, and Test, which indicate the current status and be in the latest cache of the PrepareTable.\n\nStatus in the workflow\n\n `PT.status`:\n        `nothing`         `Prepare`d\n ╠═══════════════════════╬════════════════════╬...\n\n PT::PrepareTable\n  ┃\n  ┗━━━━ preparetable! ━━━┳━━━━━━▶ preparetable!\n         ▲               ┃        that creates\n         ┗━━━━━━━━━━━━━━━┛    `T.supervised_tables`\n       (preprocessing using                   ┃\n        different configs)                    ┃\n                                              ▼\n                           ┏━━ test! ◀━━ train!\n     (change parameters to ┃          ▲       ┃\n     train or tested again)┗━━━━━━━━━━┻━━━━━━━┛\n\n                         ..═══════════╬═════════..\n                          .`Test`ed and `Train`ed\n\nField\n\nargs::NamedTuple\n\nSee also Cache.\n\n\n\n\n\n","category":"type"},{"location":"outline/#Getting-started","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"The entire workflow including data preprocessing, training and testing can be done in the following few lines:","category":"page"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"using TWAISWCF, SWCExampleDatasets # import the packages\ndf = SWCExampleDatasets.dataset(\"NCUWiseLab\", \"ARI_G2F820_example\") # load a dataset\nPT = PrepareTableDefault(df) # data preprocessing\ntraintest!(PT; \n        train_before = DateTime(2022, 03, 21), \n        test_after = DateTime(2022, 3, 22)) # train and test\nsave(PT) # save the result","category":"page"},{"location":"outline/#Load-a-dataset","page":"Getting started","title":"Load a dataset","text":"","category":"section"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"using TWAISWCF, SWCExampleDatasets\ndf = SWCExampleDatasets.dataset(\"NCUWiseLab\", \"ARI_G2F820_example\")\ndf[1:5,:] # hide","category":"page"},{"location":"outline/#[Create-the-PrepareTable-object](@ref)","page":"Getting started","title":"Create the PrepareTable object","text":"","category":"section"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"PT = PrepareTableDefault(df)","category":"page"},{"location":"outline/#Train-and-Test","page":"Getting started","title":"Train and Test","text":"","category":"section"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"traintest!(PT; train_before = DateTime(2022, 03, 21), test_after = DateTime(2022, 3, 22))","category":"page"},{"location":"outline/#Save","page":"Getting started","title":"Save","text":"","category":"section"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"save(PT)","category":"page"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"The results can also be accessible in the cache field of the PrepareTable. For example:","category":"page"},{"location":"outline/","page":"Getting started","title":"Getting started","text":"PT.cache.test.args.Y[1:5, :]","category":"page"},{"location":"finalsave/","page":"Save","title":"Save","text":"using TWAISWCF","category":"page"},{"location":"finalsave/#Save-the-results","page":"Save","title":"Save the results","text":"","category":"section"},{"location":"finalsave/","page":"Save","title":"Save","text":"Using save to save the data.","category":"page"},{"location":"finalsave/","page":"Save","title":"Save","text":"save","category":"page"},{"location":"finalsave/#SWCForecastBase.save","page":"Save","title":"SWCForecastBase.save","text":"save(PT::PrepareTable, dir0) save cache in PT to the directory dir0.\n\nExample\n\ndir0 = \"MyResults\"\nsave(PT::PrepareTable, dir0)\n\n\n\n\n\nWithout specifying the parent folder dir0, a folder of name of randomstring will be created as the parent folder.\n\nExample\n\nsave(PT::PrepareTable) # save results to /Tables_Fsd0w4/... for example\n\n\n\n\n\n","category":"function"},{"location":"install/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"install/#Install-Julia","page":"Installation","title":"Install Julia","text":"","category":"section"},{"location":"install/","page":"Installation","title":"Installation","text":"For windows user, ","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"Download the Current stable release of julia, or get julia on Microsoft Store.\nClick on julia.exe (likely under <USERNAME>\\AppData\\Local\\Programs\\Julia-1.8.5\\bin\\), or type julia in windows terminal, to start The Julia REPL.","category":"page"},{"location":"install/#Add-additional-registry","page":"Installation","title":"Add additional registry","text":"","category":"section"},{"location":"install/","page":"Installation","title":"Installation","text":"TWAISWCF and some of its dependencies are registered on OkRegistry; thus, you have to add OkRegistry to your environment firstly as follows. ","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"Open julia REPL, switch to Pkg REPL and:","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"(@v1.8) pkg> registry add https://github.com/okatsn/OkRegistry.git","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"note: Hint\nPkg comes with a REPL. Enter the Pkg REPL by pressing ] from the Julia REPL. See Pkg for more information.\nEnter ←Backspace button to switch back to julia REPL (julia>).","category":"page"},{"location":"install/#Add-TWAISWCF","page":"Installation","title":"Add TWAISWCF","text":"","category":"section"},{"location":"install/","page":"Installation","title":"Installation","text":"warning: Warning\nIt can but it is in general not recommended to work on the (@1.X) julia> environment. See the followings to learn how to generate a project and activate the project environment.Working with Environments\nHow to setup Project Environments in Julia\nCreate a temporary/throwaway environement","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"In your project environment, add TWAISWCF:","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"(@v1.8) pkg> add TWAISWCF","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"If you'd like to import (using) the example dataset for SWC estimation, add SWCExampleDatasets:","category":"page"},{"location":"install/","page":"Installation","title":"Installation","text":"(@v1.8) pkg> add SWCExampleDatasets","category":"page"},{"location":"install/#Keep-updated-to-the-latest-version","page":"Installation","title":"Keep updated to the latest version","text":"","category":"section"},{"location":"install/","page":"Installation","title":"Installation","text":"(@v1.8) pkg> up","category":"page"},{"location":"swcfb/#SWCForecastBase","page":"SWCForecastBase.jl","title":"SWCForecastBase","text":"","category":"section"},{"location":"swcfb/#Index","page":"SWCForecastBase.jl","title":"Index","text":"","category":"section"},{"location":"swcfb/","page":"SWCForecastBase.jl","title":"SWCForecastBase.jl","text":"Modules = [SWCForecastBase]","category":"page"},{"location":"swcfb/#Public-interface","page":"SWCForecastBase.jl","title":"Public interface","text":"","category":"section"},{"location":"swcfb/","page":"SWCForecastBase.jl","title":"SWCForecastBase.jl","text":"Modules = [SWCForecastBase]\nPages = [\n    \"preparetable/preparetable.jl\", \n    \"preparetable/preparetable0.jl\", \n    \"preparetable/save.jl\", \n    \"preparetable/traintest.jl\", \n    \"precipitation.jl\",\n    \"series2supervised.jl\",\n    \"myimputation/myimpute.jl\",\n    \"combinegroup.jl\", \n    \"mljmodels/treemodels.jl\",\n    ]","category":"page"},{"location":"swcfb/#SWCForecastBase.preparetable!-Tuple{PrepareTable, ConfigAccumulate}","page":"SWCForecastBase.jl","title":"SWCForecastBase.preparetable!","text":"preparetable!(PT::PrepareTable, PTC::ConfigAccumulate) generates derived variables as new columns. See ConfigAccumulate.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.preparetable!-Tuple{PrepareTable, ConfigPreprocess}","page":"SWCForecastBase.jl","title":"SWCForecastBase.preparetable!","text":"preparetable!(PT::PrepareTable, PTC::ConfigPreprocess) generates datetime column by PTC.timeargs, sort! by :datetime, do PTC.preprocessing in @chain and check if the table is continuous in time.\n\nnote: Note\nThis method will raise essential error, that PTC::ConfigPreprocess should be the first arg in args of PrepareTable(PT, args...). Otherwise, the succeeding processing such as ConfigAccumulate or ConfigSeriesToSupervised may give incorrect results without error.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.preparetable!-Tuple{PrepareTable, ConfigSeriesToSupervised}","page":"SWCForecastBase.jl","title":"SWCForecastBase.preparetable!","text":"preparetable!(PT::PrepareTable, PTC::ConfigSeriesToSupervised) creates SeriesToSupervised as PT.supervised_tables for training and testing for supervised models.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.Cache","page":"SWCForecastBase.jl","title":"SWCForecastBase.Cache","text":"Field\n\nprepare::Prepare\ntrain::Train\ntest::Test\n\nSee also TrainTestState.\n\n\n\n\n\n","category":"type"},{"location":"swcfb/#SWCForecastBase.PrepareTable-Tuple{DataFrames.DataFrame, SWCForecastBase.PrepareTableConfig, Vararg{SWCForecastBase.PrepareTableConfig}}","page":"SWCForecastBase.jl","title":"SWCForecastBase.PrepareTable","text":"Given a table::DataFrame and PTCs::PrepareTableConfig..., PrepareTable runs preparetable!(_, PTC::PrepareTableConfig) for PTC in PTCs in @chain.\n\nExample\n\n    PrepareTable(df::DataFrame, ConfigPreprocess(), ConfigSeriesToSupervised())\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.PrepareTableDefault-Tuple{DataFrames.DataFrame}","page":"SWCForecastBase.jl","title":"SWCForecastBase.PrepareTableDefault","text":"Default data processing:\n\nPrepareTableDefault(df::DataFrame) = PrepareTable(df, ConfigPreprocess(), ConfigAccumulate(), ConfigSeriesToSupervised())\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.save-Tuple{PrepareTable, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.save","text":"save(PT::PrepareTable, dir0) save cache in PT to the directory dir0.\n\nExample\n\ndir0 = \"MyResults\"\nsave(PT::PrepareTable, dir0)\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.save-Tuple{PrepareTable}","page":"SWCForecastBase.jl","title":"SWCForecastBase.save","text":"Without specifying the parent folder dir0, a folder of name of randomstring will be created as the parent folder.\n\nExample\n\nsave(PT::PrepareTable) # save results to /Tables_Fsd0w4/... for example\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.test!-Tuple{PrepareTable}","page":"SWCForecastBase.jl","title":"SWCForecastBase.test!","text":"Example\n\ntest!(PT::PrepareTable; test_after = :auto, numpoints_test = 480)\n\ntest_after: the DateTime or Date after which model prediction (model testing stage) starts. If :auto, test_after = now().\nnumpoints_test: the number of data points in the \"future\" to be tested.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.train!-Tuple{PrepareTable}","page":"SWCForecastBase.jl","title":"SWCForecastBase.train!","text":"Training with PrepareTable.\n\nExample\n\ntrain!(PT::PrepareTable;\n        train_before = :auto,\n        model = manytrees(),\n        numpoints_train = 24*120\n    )\n\ntrain_before: The DateTime or Date before which the data is used for training; if :auto, train_before = now().\nmodel: The model; it can be any MLJ model.\nnumpoints_train: from train_before how many data points (number of rows) to be included for model training.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.traintest!-Tuple{PrepareTable}","page":"SWCForecastBase.jl","title":"SWCForecastBase.traintest!","text":"traintest!(PT::PrepareTable; kwargs...) do train! then test!, accepts all keyword arguments that train! or test! could have.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.addcol_accumulation!-Tuple{Any, Any, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.addcol_accumulation!","text":"Add columns that are derived by accumulating corresponding variables using movingaverage.\n\nExample\n\nall_precipstr = names(df, r\"precipitation\")\n\napd = Dict( # time intervals to accumulates precipitation\n    \"1hour\" => 6,\n    \"12hour\" => 6*12,\n    \"1day\" => 6*24,\n    \"2day\" => 6*24*2,\n    \"3day\" => 6*24*3\n)\n\naddcol_accumulation!(df, all_precipstr, apd)\n\n\nSee also: movingaverage.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.cccount-Tuple{Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.cccount","text":"Of a time series ts, cccount(ts) calculate by default the cumulative counts of elements that approximates zero consecutively.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.movingaverage-Tuple{Vector{<:AbstractFloat}, Int64}","page":"SWCForecastBase.jl","title":"SWCForecastBase.movingaverage","text":"movingaverage(v, n) returns a vector of moving averaged v by every n.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.precipmax!-Tuple{DataFrames.DataFrame}","page":"SWCForecastBase.jl","title":"SWCForecastBase.precipmax!","text":"precipmax!(df::DataFrame) creates precipitation_max by maximize Cols(r\"\\Aprecipitation\") ByRow.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.SeriesToSupervised","page":"SWCForecastBase.jl","title":"SWCForecastBase.SeriesToSupervised","text":"T is the datetime of Y.\n\n\n\n\n\n","category":"type"},{"location":"swcfb/#SWCForecastBase._series2supervised-Tuple{Any, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase._series2supervised","text":"series2supervised(data, range_shift, range_out)\n\nTansform a time series dataset into a supervised learning dataset.\n\nThe features will always be suffixed by an addtional time shift tag \"t-i\". Also see `splittimetag()andformattime_tag`.\n\nReferences:\n\nhttps://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.convert_types-Tuple{Any, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.convert_types","text":"convert_types(df, column_names_types)\n\nConverts the element type of each column to a user-specified type.\n\nArguments\n\ndf: Dataframe for which you want to convert the eltype of each column\ncolumn_names_types: Column names and target types. The type of column_names_types   should be able to be unpacked into column names and target types in a for loop.\n\nReferences\n\nhttps://discourse.julialang.org/t/how-to-change-field-names-and-types-of-a-dataframe/43991/11\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.diffsstable!-Tuple{DataFrames.DataFrame, Any, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.diffsstable!","text":"Of a variable of name varnm, diffsstable!(X0::DataFrame, varnm, tshift) calculates the difference between the non-shifted (suffixed by \"_t0\") and time-shifted (e.g., \"_t-6\"), where the difference is the new column for the series-to-supervised table X0.\n\nExample\n\n    (X0,) = series2supervised(...)\n    diffsstable!(X0, \"precipitation_1hr\", -6)\n\nthat creates a new column diff6_precipitation_1hr = X0[:, \"precipitation_1hr_t0\"] .- X0[:, \"precipitation_1hr_t-6\"].\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.narrow_types!-Tuple{Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.narrow_types!","text":"narrow_types!(df)\n\nNarrows the eltype of each column to the type that actually exists in the each column of dataframe.\n\nArguments\n\ndf: Dataframe for which you want to narrow the eltype of each column\n\nReferences\n\nhttps://discourse.julialang.org/t/how-to-change-field-names-and-types-of-a-dataframe/43991/9\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.series2supervised-Tuple{Vararg{Pair}}","page":"SWCForecastBase.jl","title":"SWCForecastBase.series2supervised","text":"To transform a time series dataset into a supervised learning dataset\n\nExample\n\nA = randn(500,20)\ndf = DataFrame(A, :auto)\nX0,y0 = series_to_supervised(df[:,1:end-1], df[:,end])\nX1,y1 = series2supervised(\n    df[:,1:end-1] => range(-6, -1; step=1),\n    df[:,end] => range(0, 0; step=-1)\n    )\n\nNOTICE!\n\nThe input DataFrame (df) must have complete rows; that is, the corresponding time tag (it might be df.datetime for example) must be consecutive because df is converted to Matrix and shifted using lag.\nThis function filter the dataframe using completecases.\n\nReferences:\n\nhttps://machinelearningmastery.com/convert-time-series-supervised-learning-problem-python/\n\nTODO: write test for series2supervised, by making sure the datetime shift is correct (e.g., \"datetimet0\" should always be 1 hour ahead of \"datetimet-6\" for a 10-minute sampling data).\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.imputemean!-Tuple{Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.imputemean!","text":"imputemean!(df) substitute literal nan values with the statistical means. If all missing for a column, value 999 is imputed.\n\nNotice\n\nYou should be aware that imputemean! might does nothing without error message if the input is a view of dataframe (e.g., df[!, Not(:datetime)]).\n\nSee also islnan for literal nan.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.isoutofrange-Tuple{Any, Any, Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.isoutofrange","text":"Return true if value is out of the interval between l0 and l1. Noted that if value is missing, nothing, or literally nan (see islnan), it returns false (NOT out-of-range).\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.removeunreasonables!-Tuple{Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.removeunreasonables!","text":"removeunreasonables!(df_all) convert all column-name specific unreasonable values to missing. Noted that missing, nothing and literal nan is not \"unreasonable values\".\n\nNoted that removeunreasonables! will NOT deal with literally Not-a-Number value nor raising an error for any literally Not-a-Number value. See isoutofrange, islnan.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.take_hour_last-Tuple{Any}","page":"SWCForecastBase.jl","title":"SWCForecastBase.take_hour_last","text":"combine the df which were grouped by :hour taking only the last.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.fstree-Tuple{}","page":"SWCForecastBase.jl","title":"SWCForecastBase.fstree","text":"Return a composite tree model with FeatureSelector.\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.manytrees-Tuple{}","page":"SWCForecastBase.jl","title":"SWCForecastBase.manytrees","text":"A random forest using EnsembleModel\n\n\n\n\n\n","category":"method"},{"location":"swcfb/#SWCForecastBase.twofstree-Tuple{}","page":"SWCForecastBase.jl","title":"SWCForecastBase.twofstree","text":"Return a composite tree model with TWO FeatureSelector: selector_1 and selector_2.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Introduction","title":"Introduction","text":"CurrentModule = TWAISWCF","category":"page"},{"location":"#A-TWAI-subproject-for-SWC-estimation","page":"Introduction","title":"A TWAI subproject for SWC estimation","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Documentation for TWAISWCF.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"In this project, we investigate the feasibility of using the Classification and Regression Tree (CART) algorithm for estimating soil water content (SWC) using commonly available meteorological parameters.  We trained and validated CART models using data collected in a grassland terrain in northern Taiwan throughout 2018, with the goal of providing precise information for agricultural irrigation and flood risk assessment.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"This project is funded by the National Science and Technology Council (R.O.C) through grant number MOST 110-2634-F-008-008.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"warning: Disclaimer\nThe TWAISWCF package is an experimental algorithm designed for soil-water content estimation in agricultural applications. It has been made freely available to the public for exploration and experimentation purposes. However, it is important to understand and acknowledge the following disclaimer:Under Development: The TWAISWCF package is still under development. It should be considered as a work in progress, and its functionalities, performance, and reliability may change over time. Users are advised to regularly check for updates, bug fixes, and new releases.\nMisuse: The creators and contributors of the TWAISWCF package are not responsible for any misuse of this software. The package is intended to be used responsibly and within its intended scope. Any use of this package outside of its recommended guidelines is entirely at the user's own risk.\nResults and Estimations: The TWAISWCF package does not guarantee accurate or reliable results in soil-water content estimation. It is an experimental algorithm that may provide varying levels of accuracy depending on different factors such as input data quality, environmental conditions, and implementation.\nReal Agricultural Deployment: The TWAISWCF package should not be deployed or used in any real agricultural setting without proper guidance and instruction from our development team. It is essential to consult with our team to understand the limitations, potential risks, and appropriate use cases of the package before considering its deployment in practical agricultural scenarios.By using the TWAISWCF package, you acknowledge and accept the terms of this disclaimer. The creators and contributors of the TWAISWCF package disclaim any liability for damages, losses, or consequences arising from the use or misuse of this software. Use it responsibly and with caution.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Pages = [\n    \"index.md\",\n    \"install.md\",\n    \"outline.md\",\n    \"preptab.md\",\n    \"traintest.md\",\n    \"finalsave.md\", \n    \"swcd.md\",\n    \"swcfb.md\",\n]","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"CurrentModule = TWAISWCF","category":"page"},{"location":"traintest/#Training-and-Testing","page":"Train and Test","title":"Training and Testing","text":"","category":"section"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"Besides train the model and test it at once, you may have these jobs done separately.","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"traintest!(PT; \n        train_before = DateTime(2022, 03, 21), \n        test_after = DateTime(2022, 3, 22)) # train and test","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"is equivalent to ","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"train!(PT; train_before = DateTime(2022, 03, 21))\ntest!(PT; test_after = DateTime(2022, 3, 22))","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"See the followings for detailed information:","category":"page"},{"location":"traintest/","page":"Train and Test","title":"Train and Test","text":"train!\ntest!\ntraintest!","category":"page"},{"location":"traintest/#SWCForecastBase.train!","page":"Train and Test","title":"SWCForecastBase.train!","text":"Training with PrepareTable.\n\nExample\n\ntrain!(PT::PrepareTable;\n        train_before = :auto,\n        model = manytrees(),\n        numpoints_train = 24*120\n    )\n\ntrain_before: The DateTime or Date before which the data is used for training; if :auto, train_before = now().\nmodel: The model; it can be any MLJ model.\nnumpoints_train: from train_before how many data points (number of rows) to be included for model training.\n\n\n\n\n\n","category":"function"},{"location":"traintest/#SWCForecastBase.test!","page":"Train and Test","title":"SWCForecastBase.test!","text":"Example\n\ntest!(PT::PrepareTable; test_after = :auto, numpoints_test = 480)\n\ntest_after: the DateTime or Date after which model prediction (model testing stage) starts. If :auto, test_after = now().\nnumpoints_test: the number of data points in the \"future\" to be tested.\n\n\n\n\n\n","category":"function"},{"location":"traintest/#SWCForecastBase.traintest!","page":"Train and Test","title":"SWCForecastBase.traintest!","text":"traintest!(PT::PrepareTable; kwargs...) do train! then test!, accepts all keyword arguments that train! or test! could have.\n\n\n\n\n\n","category":"function"},{"location":"swcd/#SWCExampleDatasets","page":"SWCExampleDatasets.jl","title":"SWCExampleDatasets","text":"","category":"section"},{"location":"swcd/#Index","page":"SWCExampleDatasets.jl","title":"Index","text":"","category":"section"},{"location":"swcd/","page":"SWCExampleDatasets.jl","title":"SWCExampleDatasets.jl","text":"Modules = [SWCExampleDatasets]","category":"page"},{"location":"swcd/#Public-interface","page":"SWCExampleDatasets.jl","title":"Public interface","text":"","category":"section"},{"location":"swcd/","page":"SWCExampleDatasets.jl","title":"SWCExampleDatasets.jl","text":"Modules = [SWCExampleDatasets]\nPages = [\n    \"datasets.jl\",\n    \"decompress.jl\",\n]","category":"page"}]
}
