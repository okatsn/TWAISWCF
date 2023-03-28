```@meta
CurrentModule = TWAISWCF
DocTestSetup  = quote
    using TWAISWCF
end
```

```@setup preptab
using TWAISWCF
```


Outline
- `PrepareTable` is an mutable structure with its field pointing to the source data, configurations, models and train-test results 
- its contents can be changed by `train!`, `test!` or `traintest!`


## List available datasets and load one

List available datasets

```@example preptab
datasets()
```

Load one as `DataFrame`

```@example preptab
df = dataset("NCUWiseLab", "ARI_G2F820")
df[1:5,:] # hide
```

## Create the `PrepareTable` object

Use `PrepareTableDefault` to create an `PrepareTable` with default configurations:

```@docs
PrepareTableDefault
```

or use `PrepareTable` for general purposes.

```@docs
PrepareTable
```

## Config

## Manipulate
```@docs
preparetable!
```
