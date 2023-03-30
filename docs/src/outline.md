# Getting started
The entire workflow including data preprocessing, training and testing can be done in the following few lines:

```julia
using TWAISWCF # import the packages
df = dataset("NCUWiseLab", "ARI_G2F820_example") # load a dataset
PT = PrepareTableDefault(df) # data preprocessing
traintest!(PT; 
        train_before = DateTime(2022, 03, 21), 
        test_after = DateTime(2022, 3, 22)) # train and test
save(PT) # save the result
```


## Load a dataset

```@example 1
using TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820_example")
df[1:5,:] # hide
```


## [Create the `PrepareTable` object](@ref)

```@example 1
PT = PrepareTableDefault(df)
```

## Train and Test

```@example 1
traintest!(PT; train_before = DateTime(2022, 03, 21), test_after = DateTime(2022, 3, 22))
```


## Save

```@example 1
save(PT)
```

The results can also be accessible in the `cache` field of the `PrepareTable`. For example:

```@example 1
PT.cache.test.args.Y[1:5, :]
```