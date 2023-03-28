```@meta
CurrentModule = SWCForecastBase
```

Besides train the model and test it at once, you may have these jobs done separately.

```julia
traintest!(PT; 
        train_before = DateTime(2022, 03, 21), 
        test_after = DateTime(2022, 3, 22)) # train and test
```

is equivalent to 

```julia
train!(PT; train_before = DateTime(2022, 03, 21))
test!(PT; test_after = DateTime(2022, 3, 22))
```

See the followings for detailed information:

```@docs
train!
test!
traintest!
```