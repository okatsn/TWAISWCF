# TWAISWCF

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://okatsn.github.io/TWAISWCF/stable/)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://okatsn.github.io/TWAISWCF/dev/)
[![Build Status](https://github.com/okatsn/TWAISWCF/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/okatsn/TWAISWCF/actions/workflows/CI.yml?query=branch%3Amain)
[![Coverage](https://codecov.io/gh/okatsn/TWAISWCF/branch/main/graph/badge.svg)](https://codecov.io/gh/okatsn/TWAISWCF)

<!-- Don't have any of your custom contents above; they won't occur if there is no citation. -->

## Workflows
TODOs:



Pre-process
- (From a `DataFrame` `df0`)
- Calculate derived variables (accumulative precipitation) (=>`df1`)
- series2supervised (time shift) (=> `df2`)
- In TWAISWCF

Feature selection
- specific tpasts and name
- in SWCForecastBase

Models (input table: `df2`-like)
- fundamental models
- use mutable struct?
- in SWCForecastBase

Training
- train model
- update model
- In TWAISWCF

Predicting
- Use trained model to predict

### Wrapping function
Given a `df0`, current time `t0::DateTime`, train the model and outputs `df2_train` and `df2_test` (if available). % todo: remember to test the case where `df2_test` is `nothing`.

Example
```julia
mutable struct SWCModelPair
    ytrain::DataFrame
    ytest::Union{DataFrame, Nothing}
    model::MLJ.Deterministic
    name::String
    fitresult
end

mutable struct SWCEverything
    time_now::DateTime
    xtrain::DataFrame
    xtest::Union{DataFrame, Nothing}
    modelpair::Vector{<:SWCModelPair}
end

"""
Update this function.
"""
function SWCEverything(df0)
# TODO: ...
end

```

## References



This package is create on 2023-02-22.
