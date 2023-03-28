

```julia
using TWAISWCF # import the packages
df = dataset("NCUWiseLab", "ARI_G2F820") # load the data
PT = PrepareTableDefault(df) # data preprocessing
traintest!(PT; 
        train_before = DateTime(2022, 03, 21), 
        test_after = DateTime(2022, 3, 22)) # train and test
save(PT) # save the result
```


## Prepare
```@example
using TWAISWCF
df = dataset("NCUWiseLab", "ARI_G2F820")

PT = PrepareTableDefault(df)
```

## Train and Test
```
traintest!(PT; train_before = DateTime(2022, 03, 21), test_after = DateTime(2022, 3, 22))


# # Or alternatively
# ```julia
# train!(PT; train_before = DateTime(2022, 03, 21))
# test!(PT; test_after = DateTime(2022, 3, 22))
# ```

save(PT)
```


## Save