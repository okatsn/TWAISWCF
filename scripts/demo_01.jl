using Revise, TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820")
PT = PrepareTable(df)
PT = PrepareTableDefault(df)

train!(PT; train_before = DateTime(2022, 03, 21))
