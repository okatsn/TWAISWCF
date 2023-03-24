using SWCDatasets, TWAISWCF
df = SWCDatasets.dataset("NCUWiseLab", "ARI_G2F820"; update_table=true)
PT = PrepareTable(df)
