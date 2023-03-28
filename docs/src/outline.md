```julia
using TWAISWCF # import the packages
df = dataset("NCUWiseLab", "ARI_G2F820") # load the data
PT = PrepareTableDefault(df) # data preprocessing
traintest!(PT; 
        train_before = DateTime(2022, 03, 21), 
        test_after = DateTime(2022, 3, 22)) # train and test
save(PT) # save the result
```


## Load a dataset

```@example 1
using TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820")
df[1:5,:] # hide
```


## [Create the `PrepareTable` object](@ref)

```@example 1
PT = PrepareTableDefault(df)
```

## Train and Test

```
traintest!(PT; train_before = DateTime(2022, 03, 21), test_after = DateTime(2022, 3, 22))
```


## Save

```@example 1
save(PT)
```