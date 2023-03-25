using Revise, TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820")
PT = PrepareTable(df)
PT = PrepareTableDefault(df)
