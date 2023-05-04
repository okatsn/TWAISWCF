using Revise, TWAISWCF, SWCExampleDatasets
df = SWCExampleDatasets.dataset("NCUWiseLab", "ARI_G2F820_example")

using DataFrames
PT = PrepareTableDefault(df)
PT2 = PrepareTable(df,
    ConfigPreprocess(;target_features=Cols(r"soil_water_content_10cm")),
    ConfigAccumulate(; intervals = [24, 48, 36, 72]),
    ConfigSeriesToSupervised(; shift_x=[0, -2])
)
traintest!(PT2; train_before=DateTime(2022, 03, 21), test_after=DateTime(2022, 3, 22))

traintest!(PT; train_before=DateTime(2022, 03, 21), test_after=DateTime(2022, 3, 22))

# # Or alternatively
# ```julia
# train!(PT; train_before = DateTime(2022, 03, 21))
# test!(PT; test_after = DateTime(2022, 3, 22))
# ```

save(PT)
