using Revise, TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820_example")

PT = PrepareTableDefault(df)

traintest!(PT; train_before = DateTime(2022, 03, 21), test_after = DateTime(2022, 3, 22))

# # Or alternatively
# ```julia
# train!(PT; train_before = DateTime(2022, 03, 21))
# test!(PT; test_after = DateTime(2022, 3, 22))
# ```

save(PT)
