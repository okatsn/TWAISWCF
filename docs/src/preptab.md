```@meta
CurrentModule = TWAISWCF
```

```@setup preptab
using TWAISWCF, SWCExampleDatasets
```

# An Exemplary Workflow

Outline
- `PrepareTable` is an mutable structure with its field pointing to the source data, configurations, models and train-test results 
- its contents can be changed by `train!`, `test!` or `traintest!`
- `PrepareTable` by default use regular expression for sorting and partitioning the input table; see the [Configuration](@ref) for more detailed information.




## Load an dataset
List available datasets from `SWCExampleDatasets`:

```@example preptab
using SWCExampleDatasets
SWCExampleDatasets.datasets()
```

Load one as `DataFrame`:

```@example preptab
df = SWCExampleDatasets.dataset("NCUWiseLab", "ARI_G2F820_example")
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

## Configuration
Currently available configurations:

```@docs
ConfigAccumulate
ConfigPreprocess
ConfigSeriesToSupervised
```

## Manipulate
```@docs
preparetable!
```

## Status in each step
```@docs
SWCForecastBase.TrainTestState
```

